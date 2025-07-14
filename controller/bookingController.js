const { Users, Bus, Bookings } = require('../models/associations');

async function createBooking(req, res) {
    const { userId, busId, seatNumber } = req.body;

    try {
        // Check if User exists
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }

        // Check if Bus exists
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            return res.status(404).json({ message: `Bus with ID ${busId} not found.` });
        }

        // Check if enough seats are available
        if (bus.availableSeats < 1) {
            return res.status(400).json({ message: "No available seats on this bus." });
        }

        // Create the Bookings
        const booking = await Bookings.create({ userId, busId, seatNumber });

        // Decrease the available seat count
        bus.availableSeats -= 1;
        await bus.save();

        res.status(201).json({
            message: "Bookings created successfully!",
            booking
        });
    } catch (error) {
        console.error("Error creating Booking:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getBookingbyUserId(req,res){
    const userId = req.params.id;
    try {
        const bookings = await Bookings.findAll({
            attributes:["id","seatNumber"],
            where:{userId},
            include:[{
                model:Bus,
                attributes:["busNumber","id"]
            }]
        })
        if(!bookings.length){
            return res.status(404).json({message:`No booking found for user with user id ${userId}`});
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.log("Error while fetching booking by userID",error.message);
        res.status(500).json({message:"Booking fetching based on userID failed!"});
    }
}

async function getBookingbyBusId(req,res){
const busId = req.params.id;
    try {
        const bookings = await Bookings.findAll({
            attributes:["id","seatNumber"],
            where:{busId},
            include:[{
                model:Users,
                attributes:["id","name"]
            }]
        })
        if(!bookings.length){
            return res.status(404).json({message:`No booking found for bus with bus id ${busId}`});
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.log("Error while fetching booking by busId",error.message);
        res.status(500).json({message:"Booking fetching based on busId failed!"});
    }
}

module.exports = {
    createBooking,
    getBookingbyUserId,
    getBookingbyBusId
};
