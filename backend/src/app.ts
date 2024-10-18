import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConfig';
import shortUrl from './routes/shortUrl';

dotenv.config();
connectDB();
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))



app.use("/api/", shortUrl);


app.listen(port , ()=> {
    console.log(`Server running on port ${port} , Frontend URL: ${process.env.FRONTEND_URL}`);
});