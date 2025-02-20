import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from './routes/userRoutes/userRoutes';

import { basicAuth } from "./middlewares/basicAuth";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();

// Middleware
app.use(express.json());
app.use(rateLimiter);
app.use(basicAuth);

// db connection
connectDB()

// Routes
app.use("/api/v1/user", userRoutes);

app.get('/testing', (req, res) => {
    res.status(200).json({
        mes: "working"
    })
})

app.all("*", (req, res) => {
    console.warn(`⚠️ Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: `Route ${req.originalUrl} not found!` });
});

export default app;