const express = require("express");
const app = express();
const db = require("./utils/db-connection");
const Booking = require("./models/Bookings");
const Bus = require("./models/Bus");
const Payments = require("./models/Payments");
const Users = require("./models/Users");

const usersRoutes = require("./routes/usersRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
const busesRoutes = require("./routes/busesRoutes");

app.use(express.json());

app.use("/users",usersRoutes);
app.use("/buses",busesRoutes);
// app.use("/payment",paymentRoutes);
// app.use("/booking",bookingRoutes);

app.get("/", (req, res) => {
    res.send("This is BUS BOOKING SYSTEM");
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err.message, "Server is not running.");
        return;
    }
    console.log("Server on http://localhost:3000");
})