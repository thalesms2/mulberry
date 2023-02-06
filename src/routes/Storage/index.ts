import express from "express"

import getAllDeposits from "./getAllDeposits"
import getDepositPerId from "./GetDepositPerId"
import createNewDeposit from "./createNewDeposit"
import editDepositPerId from "./editDepositPerId"
import deleteDepositPerId from "./deleteDepositPerId"
import deleteAllDeposits from "./deleteAllDeposits"

const router = express.Router()

router.get("/", getAllDeposits)
// router.get("/:id", getDepositPerId)
router.post("/", createNewDeposit)
// router.put("/", editDepositPerId)
// router.delete("/", deleteDepositPerId)
// router.delete("/all", deleteAllDeposits)

export default router;