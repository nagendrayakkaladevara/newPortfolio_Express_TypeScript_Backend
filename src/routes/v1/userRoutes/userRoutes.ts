import express from "express";
import { getAllBlogs, getBlogsCatalog, getBlogById, postContact } from "../../../controllers/v1/userControllers/userController";

const router = express.Router();

// get
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogsCatalog", getBlogsCatalog);
router.get("/getBlogById/:blogId", getBlogById);

// post
router.post("/contact", postContact)

export default router;