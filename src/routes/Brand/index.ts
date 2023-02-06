import express from "express";

import getAllBrands from "./getAllBrands";
import getBrandPerId from "./getBrandPerId";
import createNewBrand from "./createNewBrand";
import editBrandPerId from "./ediBrandPerId";
import deleteBrandPerId from "./deleteBrandPerId";
import deleteAllBrands from "./deleteAllBrands";

const router = express.Router();

router.get("/", getAllBrands);
router.get("/:id", getBrandPerId);
router.post("/", createNewBrand);
router.put("/", editBrandPerId);
router.delete("/", deleteBrandPerId);
router.delete("/all", deleteAllBrands);

export default router;
