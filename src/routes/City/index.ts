import express from "express";

import getAllCitys from "./getAllCitys";
import getCityPerCode from "./getCityPerCode";
import createNewCity from "./createNewCity";
import editCityPerCode from "./editCityPerCode";
import deleteCityPerId from "./deleteCityPerId";
import deleteAllCitys from "./deleteAllCitys";

const router = express.Router();

router.get("/", getAllCitys);
router.get("/:code", getCityPerCode);
router.post("/", createNewCity);
router.put("/", editCityPerCode);
router.delete("/", deleteCityPerId);
router.delete("/all", deleteAllCitys);

export default router;