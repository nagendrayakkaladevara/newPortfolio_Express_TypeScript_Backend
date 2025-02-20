import { Request, Response } from "express";
import Contact from "../../../models/v1/contactsModel";
import { idSchema } from "../../../utils/validations/v1AdminValidations/adminValidations";

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