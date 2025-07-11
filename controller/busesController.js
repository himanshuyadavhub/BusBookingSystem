const { Op } = require("sequelize");

const db = require("../utils/db-connection")
const Bus = require("../models/Bus");

async function addBuses(req, res) {
    const { busNumber, totalSeats, availableSeats } = req.body;
    try {
        const addedBus = await Bus.create({busNumber, totalSeats, availableSeats});
        console.log(`Added Bus`, addedBus);
        res.status(200).send(`Bus with number ${busNumber} created successfully..`);
    } catch (error) {
        console.log("Bus adding went wrong", error.message)
        res.status(500).send("New bus was not added!");
    }
}

async function getBusesAvailable(req, res) {
    const requiredSeats = req.params.seats;

    try {
        const availableBuses = await Bus.findAll({
            where: {
                availableSeats: {
                    [Op.gt]: requiredSeats
                }
            }
        });
        if (availableBuses.length) {
            res.status(200).send(availableBuses);
            return;
        }
        res.status(200).send("No buses available..");

    } catch (error) {
        console.log("Getting available bus failed", error.message)
        res.status(500).send("Getting available bus failed..");
    }

}

module.exports = {
    addBuses,
    getBusesAvailable
}