import express from "express";

import getAllProviders from "./getAllProviders";
import getProviderPerId from "./getProviderPerId";
import createNewProvider from "./createNewProvider";
import editProviderPerId from "./editProviderPerId";
import deleteProviderPerId from "./deleteProviderPerId";
import deleteAllProviders from "./deleteAllProviders";

const router = express.Router();

router.get("/", getAllProviders);
router.get("/:id", getProviderPerId);
router.post("/", createNewProvider);
router.put("/", editProviderPerId);
router.delete("/", deleteProviderPerId);
router.delete("/all", deleteAllProviders);

export default router;
