const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");


router.post("/",bookingController.createBooking);
router.get("/users/:id/",bookingController.getBookingbyUserId);
router.get("/buses/:id",bookingController.getBookingbyBusId);

module.exports = router;