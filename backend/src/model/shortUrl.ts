import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";

// Define an interface for the ShortUrl document
interface IShortUrl extends Document {
    fullUrl: string;
    shorturl: string;
    click: number;
}

// Define the schema with types
const shortUrlSchema = new Schema<IShortUrl>({
    fullUrl: {
        type: String,
        required: true,
    },
    shorturl: {
        type: String,
        required: true,
        default: () => nanoid().substring(0, 10),
    },
    click: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the model using the interface and schema
export const urlModel = mongoose.model<IShortUrl>("ShortUrl", shortUrlSchema);
