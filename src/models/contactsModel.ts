import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
    name: string;
    mailaddress: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "Please enter a name"],
            trim: true,
        },
        mailaddress: {
            type: String,
            required: [true, "Please enter an email"],
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: [true, "Please enter a message"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
