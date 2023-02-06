import express from "express";

import getAllCompanys from "./getAllCompanys";
import getCompanyPerId from "./getCompanyPerId";
import createCompany from "./createCompany";
import editCompanyPerId from "./editCompanyPerId";
import deleteCompanyPerId from "./deleteCompanyPerId";

const router = express.Router();

router.get("/", getAllCompanys);
router.get("/:id", getCompanyPerId);
router.post("/", createCompany);
router.put("/", editCompanyPerId);
router.delete("/", deleteCompanyPerId);

export default router;