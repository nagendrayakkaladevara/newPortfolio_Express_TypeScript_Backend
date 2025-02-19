import express from "express";
import { getAllBlogs } from "../../controllers/userControllers/userController";

const router = express.Router();

router.get("/getAllBlogs", getAllBlogs);

export default router;
