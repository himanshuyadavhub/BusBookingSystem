const db = require("../utils/db-connection")

function addBuses(req,res){
    const {busNumber,totalSeats,availableSeats} = req.body;
    const insertQuery = "INSERT INTO Buses(busNumber,totalSeats,availableSeats) VALUES (?,?,?);"
    db.execute(insertQuery,[busNumber,totalSeats,availableSeats],(err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("New bus was not added!");
            db.end();
            return;
        }
        res.status(200).send(`Bus ${busNumber} has been added!`);
    })
}

function getBusesAvailable(req,res){
    const requiredSeats = req.params.seats;
    const findQuery = "SELECT * FROM Buses WHERE availableSeats > (?);"
    db.execute(findQuery,[requiredSeats],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("Something went wrong..");
            db.end();
            return;
        }
        if(result.length){
            res.status(200).send(result);
        }else{
            res.status(200).send("No buses available..");
        }
    })

}

module.exports = {
    addBuses,
    getBusesAvailable
}