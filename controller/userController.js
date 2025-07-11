const db = require("../utils/db-connection")


function addUser(req,res){
    const {name,email} = req.body;
    const insertQuery = `INSERT INTO users (email,name) VALUES (?,?);`
    db.execute(insertQuery,[email,name],(err) => {
        if(err){
            console.log(err);
            res.status(500).send("User was not created..");
            db.end();
            return;
        }
        res.status(200).send("User has been created..");
    })

}

function getUser(req,res){
    const getQuery = "SELECT * FROM users;"
    db.execute(getQuery,(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send("Can not get users data");
            db.end();
            return;
        }
        if(result){
            res.status(200).send(result);
        }
        
        
    })
}




module.exports = {
    addUser,
    getUser
}