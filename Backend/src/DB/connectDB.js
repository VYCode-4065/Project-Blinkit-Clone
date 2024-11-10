import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const mongodb = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connection established successfully !');
        console.log(mongodb.connections[0].host);


    } catch (e) {
        console.log('Mongodb connection failed !');
        process.exit(1);
    }
}

export default connectDB;