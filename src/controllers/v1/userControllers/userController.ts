import { Request, Response } from "express";
import Blog, { IBlog } from "../../../models/v1/blogModel";
import { blogIdSchema, contactSchema } from "../../../utils/validations/v1UserValidations/userValidations";
import Contact from "../../../models/v1/contactsModel";
// import redisClient from "../../utils/redisClient";

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogPosts = await Blog.find({}).lean(); // lean() - Converts documents to plain objects, improving query speed. Using lean(): This improves query performance by returning plain JavaScript objects instead of Mongoose documents.
        res.status(200).json(blogPosts);
    } catch (error) {
        console.log("🚀 ~ getAllBlogs ~ error:", error)
        res.status(500).json({ message: "Internal server error!" })
    }
};

let blogsCache: any[] | null = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000;

export const getBlogsCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
        const now = Date.now();

        if (blogsCache && now - lastCacheTime < CACHE_DURATION) {
            console.log("Serving from cache");
            res.status(200).json({ message: "Serving from cache!", blogsCache });
            return;
        }

        const blogs = await Blog.find({}, "_id title description date_published categories");

        const modifiedResponse = blogs.map(blog => ({
            id: blog._id,
            title: blog.title,
            intro: blog.description?.[0]?.paragraph1 || "No description available",
            date: blog.date_published,
            categories: blog.categories
        }));

        blogsCache = modifiedResponse;
        lastCacheTime = now;

        res.status(200).json({ message: "Serving from DB!", modifiedResponse });
    } catch (error) {
        console.error("🚀 ~ getBlogsCatalog ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

// export const getBlogsCatalog = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const cacheKey = "blogs_catalog";

//         // Check if data exists in Redis cache
//         const cachedData = await redisClient.get(cacheKey);
//         if (cachedData) {
//             console.log("Serving from cache");
//             res.status(200).json(JSON.parse(cachedData));
//             return;
//         }

//         // If no cache, fetch data from DB
//         const blogs: Pick<IBlog, "_id" | "title" | "description" | "date_published" | "categories">[] =
//             await Blog.find({}, "_id title description date_published categories");

//         const modifiedResponse = blogs.map(blog => ({
//             id: blog._id,
//             title: blog.title,
//             intro: blog.description?.[0]?.paragraph1 || "No description available",
//             date: blog.date_published,
//             categories: blog.categories
//         }));

//         // Store data in Redis cache for 10 minutes (600 seconds)
//         await redisClient.set(cacheKey, JSON.stringify(modifiedResponse), "EX", 600);

//         console.log("Serving from DB and caching data");
//         res.status(200).json(modifiedResponse);
//     } catch (error) {
//         console.error("🚀 ~ getBlogsCatalog ~ error:", error);
//         res.status(500).json({ message: "Please try again later." });
//     }
// };


export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {

        if (!req.params.blogId) {
            res.status(400).json({ message: "Blog ID is required in the URL!" });
            return;
        }

        const validation = blogIdSchema.safeParse(req.params);

        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }

        const { blogId } = validation.data;

        const blog = await Blog.findById(blogId).lean();

        if (!blog) {
            res.status(404).json({ message: "Blog not found!" });
            return;
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error("🚀 ~ Error fetching blog:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};


export const postContact = async (req: Request, res: Response): Promise<void> => {
    try {

        const validation = contactSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return
        }

        const newContact = await Contact.create(validation.data);

        res.status(201).json({
            message: "Contact successfully created!",
            contact: newContact,
        });
    } catch (error) {
        console.error("🚀 ~ Error creating contact:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}