import express from "express";
import { getAllBlogs ,getBlogsCatalog } from "../../controllers/userControllers/userController";

const router = express.Router();

router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogsCatalog", getBlogsCatalog);

export default router;
