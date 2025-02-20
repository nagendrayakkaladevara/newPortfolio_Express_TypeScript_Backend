import mongoose from "mongoose";
import { z } from "zod";


// http://localhost:5000/api/v1/admin/deleteContact/{67b6f757068a415848ea613a}
export const idSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid contact ID format!",
});


export const blogSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long.").max(100, "Title must not exceed 100 characters."),
    date_published: z.preprocess((arg) => new Date(arg as string), z.date().refine(date => !isNaN(date.getTime()), { message: "Invalid date format." })),
    categories: z.any().optional(),
    description: z.array(
        z.object({
            paragraph1: z.string().min(5, "Paragraph1 must be at least 5 characters long."),
            paragraph2: z.string().optional(),
            paragraph3: z.string().optional(),
        })
    ).optional(),
    featured_image: z.string().url("Invalid URL format for featured_image.").optional(),
    code: z.string().optional(),
    link: z.string().url("Invalid URL format for link.").optional(),
});

export const updateBlogSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long.").optional(),
    date_published: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }).optional(),
    categories: z.array(z.string()).min(1, "At least one category is required.").optional(),
    description: z.array(
        z.object({
            paragraph1: z.string().min(10, "Paragraph 1 must be at least 10 characters long."),
            paragraph2: z.string().optional(),
            paragraph3: z.string().optional()
        })
    ).optional(),
    featured_image: z.string().url("Invalid URL format for featured_image.").optional(),
    code: z.string().optional(),
    link: z.string().url("Invalid URL format for link.").optional()
});