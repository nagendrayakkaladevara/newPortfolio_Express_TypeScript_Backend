import mongoose, { Document, Schema } from "mongoose";

interface IDescription {
    paragraph1: string;
    paragraph2?: string;
    paragraph3?: string;
}

export interface IBlog extends Document {
    post_id: string;
    title: string;
    date_published: Date;
    categories: string[];
    description?: IDescription[];
    featured_image?: string;
    code?: string;
    link?: string;
}

const BlogSchema: Schema = new Schema<IBlog>({
    post_id: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    date_published: {
        type: Date,
        required: [true, "Please enter a date_published"]
    },
    categories: {
        type: [String],
        required: [true, "Please enter categories"]
    },
    description: {
        type: [
            {
                paragraph1: {
                    type: String,
                    required: [true, "Please enter paragraph1"]
                },
                paragraph2: {
                    type: String
                },
                paragraph3: {
                    type: String
                }
            }
        ],
        required: false
    },
    featured_image: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});

const Blog = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
