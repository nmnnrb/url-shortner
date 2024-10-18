import express from "express";
import { urlModel } from "../model/shortUrl";


export const createUrl = async (req:express.Request, res: express.Response) => {

    try {
        const { fullUrl } = req.body;

        const urlFound = await urlModel.find({fullUrl});
        if(urlFound.length > 0) {
            res.status(409).send(urlFound);
        }else{
            const ShortUrl = urlModel.create({fullUrl});
            res.status(201).send({ ShortUrl });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: error.message, // Send error message to understand the problem
        });
    }
    
}



export const getAllUrl = async (req:express.Request, res: express.Response) => {
    try {
        const shortUrlss = await urlModel.find();
        if(shortUrlss.length === 0){
            res.status(404).send({"message" : "No URL found"})
        }else{
            res.status(200).send(shortUrlss);
        }

    } catch (error) {
        res.status(500).send({"message": "Something Went Wrogn! "}); 
    }
}



export const getUrl = async (req:express.Request, res: express.Response) => {
    const shortUrl = await urlModel.findOne({shorturl: req.params.id});


    try {
        if(!shortUrl) {
            res.status(404).send({"message" : "No URL found"})
        } else {
            shortUrl.click++;
            await shortUrl.save();
            return res.redirect(`${shortUrl.fullUrl}`);
        } 
    } catch (error) {
        res.status(500).send({"message": "Something Went Wrogn! "}); 
    }
 
}



export const deleteUrl = async (req:express.Request, res: express.Response) => {
    const shortUrl = await urlModel.findByIdAndDelete({_id : req.params.id});
    try {
        if(shortUrl) {
            res.status(404).send({"message" : " URL found and deleted"})
        }
    } catch (error) {
        res.status(500).send({"message": "Something Went Wrogn!"}); 
    }
}
