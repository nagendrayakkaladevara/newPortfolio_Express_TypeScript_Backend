import { Request, Response } from "express";
import Contact from "../../../models/v1/contactsModel";
import { blogSchema, idSchema, updateBlogSchema } from "../../../utils/validations/v1AdminValidations/adminValidations";
import Blog from "../../../models/v1/blogModel";

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {

        const contacts = await Contact.find({})
            .select("name mailaddress message")
            .lean();

        if (!contacts.length) {
            res.status(204).send();
            return;
        }

        res.status(200).json(contacts);
    } catch (error) {
        console.error("🚀 ~ getContacts ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
    try {

        const parseResult = idSchema.safeParse(req.params.id);
        if (!parseResult.success) {
            res.status(400).json({ message: parseResult.error.errors[0].message });
            return
        }

        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            res.status(404).json({ message: "Contact not found!" });
            return
        }

        res.status(200).json({ message: "Contact deleted successfully", contact });
    } catch (error) {
        console.error("🚀 ~ deleteContact ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const postBlog = async (req: Request, res: Response): Promise<void> => {
    try {

        const validation = blogSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: validation.error.errors.map(err => err.message),
            });
            return;
        }

        const { title, date_published, categories, description, featured_image, code, link } = validation.data;

        const newBlogPost = new Blog({
            title,
            date_published,
            categories,
            description,
            featured_image,
            code,
            link
        });

        const savedPost = await newBlogPost.save();
        res.status(201).json({ message: "Blog post created Successfully", data: savedPost.toObject() });
    } catch (error) {
        console.error("🚀 ~ postBlog ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            res.status(400).json({ message: "Blog ID is required." });
            return;
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            res.status(404).json({ message: "Blog not found!" });
            return;
        }

        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("🚀 ~ deleteBlog ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};


export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            res.status(400).json({ message: "Blog ID is required." });
            return;
        }

        const validation = updateBlogSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true, runValidators: true }).lean();

        if (!updatedBlog) {
            res.status(404).json({ message: "Blog not found!" });
            return;
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error("🚀 ~ updateBlog ~ error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};