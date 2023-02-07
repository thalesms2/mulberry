import express from "express";

import getAllClients from './getAllClients'
import getClientPerId from './getClientPerId'
import createNewClient from './createNewClient'
import editClientPerId from './editClientPerId'
import deleteClientPerId from './deleteClientPerId'
import deleteAllClients from './deleteAllClients'

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientPerId);
router.post("/", createNewClient);
router.put("/", editClientPerId);
router.delete("/", deleteClientPerId);
router.delete("/all", deleteAllClients);

export default router;