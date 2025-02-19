import express from "express";
// import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes);


app.get('/testing', (req, res) => {
    res.status(200).json({
        mes: "working"
    })
})

export default app;
