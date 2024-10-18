import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { fullUrl } = req.body;

        const urlFound = await urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409).send(urlFound); // Conflict: URL already exists
        } else {
            const shortUrl = await urlModel.create({ fullUrl }); // Await the creation
            res.status(201).send({ shortUrl }); // Created: Send back the created URL
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).send({ error: error.message }); // Internal Server Error
        } else {
            console.error("Unknown error:", error);
            res.status(500).send({ error: "An unknown error occurred" });
        }
    }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find();
        if (shortUrls.length === 0) {
            res.status(404).send({ "message": "No URL found" }); // Not Found
        } else {
            res.status(200).send(shortUrls); // OK
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).send({ error: error.message }); // Internal Server Error
        } else {
            console.error("Unknown error:", error);
            res.status(500).send({ error: "An unknown error occurred" });
        }
    }
}

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({ shorturl: req.params.id });
        if (!shortUrl) {
            res.status(404).send({ "message": "No URL found" }); // Not Found
        } else {
            shortUrl.click++;
            await shortUrl.save();
            return res.redirect(`${shortUrl.fullUrl}`); // Redirect to full URL
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).send({ error: error.message }); // Internal Server Error
        } else {
            console.error("Unknown error:", error);
            res.status(500).send({ error: "An unknown error occurred" });
        }
    }
}

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ "message": "URL found and deleted" }); // OK
        } else {
            res.status(404).send({ "message": "URL not found" }); // Not Found
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).send({ error: error.message }); // Internal Server Error
        } else {
            console.error("Unknown error:", error);
            res.status(500).send({ error: "An unknown error occurred" });
        }
    }
}
