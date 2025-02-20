import express from "express";
import { getContacts, deleteContact, postBlog, deleteBlog, updateBlog } from "../../../controllers/v1/adminControllers/adminController";


const router = express.Router();

// get
router.get("/getContacts", getContacts);

// post 
router.post('/postBlog', postBlog);

// put
router.put("/blogs/:blogId", updateBlog);

// delete
router.delete("/deleteContact/:id", deleteContact)
router.delete("/blogs/:blogId", deleteBlog);

export default router;