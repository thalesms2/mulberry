import express from "express";

import getAllUsers from "./getAllUsers";
import verifyLogin from "./verifyLogin";
import createNewUser from "./createNewUser";
import editUserPerId from "./editUserPerId";
import deleteUserPerId from "./deleteUserPerId";
import deleteAllUsers from "./deleteAllUsers";

const router = express.Router();

router.get("/", getAllUsers)
router.post("/", verifyLogin);
router.post("/create", createNewUser);
router.put("/", editUserPerId);
router.delete("/:id", deleteUserPerId);
router.delete("/all", deleteAllUsers);

export default router;