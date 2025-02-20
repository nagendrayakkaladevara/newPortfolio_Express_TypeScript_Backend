import mongoose from "mongoose";
import { z } from "zod";


// http://localhost:5000/api/v1/admin/deleteContact/{67b6f757068a415848ea613a}
export const idSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid contact ID format!",
});