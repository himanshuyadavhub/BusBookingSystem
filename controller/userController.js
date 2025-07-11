const db = require("../utils/db-connection")
const Users = require("../models/Users");



async function addUser(req, res) {
    const { name, email } = req.body;
    try {
        const user = await Users.create({ name, email });
        res.status(200).send("User Created Succesfully");
    } catch (error) {
        console.log(error.message)
        res.status(400).send("User creation failed!");
    }

}

async function getUser(req, res) {
    try {
        const users = await Users.findAll();
        if (users.length) {
            console.log("Fetched users detailed!");
            res.status(200).send(users);
            return;
        }
        res.status(400).sned("No existing user!");

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Could not fetched Users data!");
    }
}




module.exports = {
    addUser,
    getUser
}