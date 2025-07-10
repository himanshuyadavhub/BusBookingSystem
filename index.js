const express = require("express");
const app = express();

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Server123",
    database: "busbookingsystem"
})

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("DB Connected succesfully!");
})

const createTableUsers = `CREATE TABLE Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE);`
const createTableBuses = `CREATE TABLE Buses (id INT AUTO_INCREMENT PRIMARY KEY, busNumber VARCHAR(50), totalSeats INT, availableSeats INT);`
const createTableBookings = `
  CREATE TABLE IF NOT EXISTS Bookings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seatNumber INT,
    userId INT,
    busId INT,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(busId) REFERENCES Buses(id)
);`

const createTablePayments = `
  CREATE TABLE IF NOT EXISTS Payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    amountPaid DECIMAL(10, 2),
    paymentStatus VARCHAR(20),
    bookingId INT,
    FOREIGN KEY(bookingId) REFERENCES Bookings(id)
);`

connection.query(createTableUsers,(err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }
    console.log("Users Table created!");
})

connection.query(createTableBuses,(err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }
    console.log("Buses Table created!");
})

connection.query(createTableBookings,(err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }
    console.log("Bookings Table created!");
})

connection.query(createTablePayments,(err)=>{
    if(err){
        console.log(err);
        connection.end();
        return;
    }
    console.log("Payments Table created!");
})


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