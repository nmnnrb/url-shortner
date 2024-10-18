import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`)
        console.log("MongoDB Connected... ", connect.connection.host, connect.connection.name);
    } catch (error) {
    if (error instanceof Error) {
        console.error("Error:", error.message);
    } else {
        console.error("Unknown error:", error);
    }
}

export default connectDB;
