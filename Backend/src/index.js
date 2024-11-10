import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from 'helmet';
import connectDB from "./DB/connectDB.js";
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

app.get('/', (req, res) => {
    res.send('Server running successfully !')
})

app.get('/love', (req, res) => {
    res.send('<h1>Vishal love vibha so much !</h1>')
})

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running at port no :${PORT}`);

    })
})