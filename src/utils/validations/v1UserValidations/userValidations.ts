import { z } from "zod";

// http://localhost:5000/api/v1/user/getBlogById/{665c762dedcb0d431d03a2de}
export const blogIdSchema = z.object({
    blogId: z.string().length(24, "Invalid Blog ID! Must be a 24-character MongoDB ObjectId."),
});
