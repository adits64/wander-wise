// const express = require("express");
import express from 'express';
import connectDB from './config/database.js';
import HANDLERS from './handlers/index.js';
import errorMiddleware from './middlewares/error.js';
import { authMiddleware } from './middlewares/auth.js';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(cors({
    origin: "https://wander-wise-seven-rose.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use(authMiddleware);
app.use("/", HANDLERS);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
