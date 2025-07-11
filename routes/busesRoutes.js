const express = require("express");
const router = express.Router();
const busesController = require("../controller/busesController");


router.post("/",busesController.addBuses);
router.get("/available/:seats",busesController.getBusesAvailable);

module.exports = router;