import express from "express";

import getAllGroups from "./getAllGroups";
import getGroupPerId from "./getGroupPerId";
import createNewGroup from "./createNewGroup";
import editGroupPerId from "./editGroupPerId";
import deleteGroupPerId from "./deleteGroupPerId";
import deleteAllGroups from "./deleteAllGroups";

const router = express.Router();

router.get("/", getAllGroups);
router.get("/:id", getGroupPerId);
router.post("/", createNewGroup);
router.put("/", editGroupPerId);
router.delete("/", deleteGroupPerId);
router.delete("/all", deleteAllGroups);

export default router;