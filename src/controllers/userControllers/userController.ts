import { Request, Response } from "express";
import Blog from "../../models/blogModel";

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogPosts = await Blog.find({}).lean(); // lean() - Converts documents to plain objects, improving query speed. Using lean(): This improves query performance by returning plain JavaScript objects instead of Mongoose documents.
        res.status(200).json(blogPosts);
    } catch (error) {
        console.log("🚀 ~ getAllBlogs ~ error:", error)
        res.status(500).json({ message: "Please try after sometime." })
    }
};
