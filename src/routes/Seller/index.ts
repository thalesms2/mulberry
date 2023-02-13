import express from "express";

import getAllSellers from './getAllSellers'
import getSellerPerId from './getSellerPerId'
import createNewSeller from './createNewSeller'
import editSellerPerId from './editSellerPerId'
import deleteSellerPerId from './deleteSellerPerId'

const router = express.Router();


router.get("/", getAllSellers);
router.get("/:id", getSellerPerId);
router.post("/", createNewSeller);
router.put("/", editSellerPerId);
router.delete("/", deleteSellerPerId);

export default router;