import { z } from "zod";

// Regex to ensure the input starts with a letter and contains only allowed characters
const startsWithLetterRegex = /^[A-Za-z][A-Za-z0-9\s.,!?@'-]*$/;

// http://localhost:5000/api/v1/user/getBlogById/{665c762dedcb0d431d03a2de}
export const blogIdSchema = z.object({
    blogId: z.string().length(24, "Invalid Blog ID! Must be a 24-character MongoDB ObjectId."),
});

// http://localhost:5000/api/v1/user/contact
export const contactSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long.")
        .max(30, "Name must be at most 30 characters long.")
        .regex(startsWithLetterRegex, "Name must start with a letter and contain only valid characters."),

    mailaddress: z
        .string()
        .email("Invalid email format.")
        .toLowerCase(),

    message: z
        .string()
        .max(50, "Message must be at most 50 characters long.")
        .optional()
        .refine((msg) => !msg || startsWithLetterRegex.test(msg), {
            message: "Message must start with a letter and contain only valid characters.",
        }),
});