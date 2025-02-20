import { Request, Response } from "express";
import Contact from "../../../models/v1/contactsModel";

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
