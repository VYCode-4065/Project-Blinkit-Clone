import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from 'helmet';
import connectDB from "./DB/connectDB.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Server running successfully !')
})


app.use('/api/user', userRouter);


app.use((req, res) => {
    res.send('Something went wrong');
})






const PORT = 8080 || process.env.PORT;

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running at port no :${PORT}`);

    })
})