import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";

const connectDB = async () => {
    try {

        const mongodb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('MongoDB connection established successfully !');
        console.log(mongodb.connections[0].host);


    } catch (e) {
        console.log('Mongodb connection failed !', e);
        process.exit(1);
    }
}

export default connectDB;