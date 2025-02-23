import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import userRoutes from './routes/v1/userRoutes/userRoutes';
import adminRoutes from './routes/v1/admin/adminRoutes';

import { basicAuth } from "./middlewares/v1/basicAuth";
import { rateLimiter } from "./middlewares/v1/rateLimiter";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(rateLimiter);

app.use('/', (req, res) => {
    res.status(200).json({
        message: "🚀 Welcome to My API!",
        description: "This is the backend for my portfolio, built with Express, TypeScript, and MongoDB. API's are secured with Basic Auth, optimized with Redis caching, and validated using Zod.",
        techStack: ["Express.js", "TypeScript", "MongoDB"],
        features: [
            "✅ Zod for validation",
            "✅ Rate Limiting for security",
            "✅ Basic Authentication",
            "✅ Redis for caching",
            "✅ Client built with React + TypeScript"
        ],
        clientURL: "https://newnagendra.netlify.app/",
        documentation: "Coming Soon... 📜",
        uptime: `${Math.floor(process.uptime())} seconds`,
        timestamp: new Date().toISOString(),
        // funFact: "💡 Did you know? JavaScript was created in just 10 days! 🚀",
        // tryIt: "🔗 API Playground: [Your API endpoint here]",
        status: "API is up and running! 🎉"
    });
});

app.use(basicAuth);

// db connection
connectDB()

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

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