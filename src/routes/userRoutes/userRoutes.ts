import express from "express";
import { getAllBlogs, getBlogsCatalog, getBlogById } from "../../controllers/userControllers/userController";

const router = express.Router();

router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogsCatalog", getBlogsCatalog);
router.get("/getBlogById/:blogId", getBlogById);

export default router;