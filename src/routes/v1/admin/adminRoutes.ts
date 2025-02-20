import express from "express";
import { getContacts, deleteContact } from "../../../controllers/v1/adminControllers/adminController";


const router = express.Router();

// get
router.get("/getContacts", getContacts);


// delete
router.delete("/deleteContact/:id", deleteContact)

export default router;