import express from "express";
import { getContacts } from "../../../controllers/v1/adminControllers/adminController";


const router = express.Router();

// get
router.get("/getContacts", getContacts);


export default router;