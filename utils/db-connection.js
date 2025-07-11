const Sequelize = require('sequelize');
const sequelize = new Sequelize("busbookingsystem","root","Server123",{host:"localhost",dialect:"mysql"});

async function checkDBConnection(sequelize){
    try {
        await sequelize.authenticate();
        console.log("DB Connection succesfull!");

        await sequelize.sync({alter:true});
        console.log("Table synced with Model.");
    } catch (error) {
        console.log("DB connection failed.",error.message);
    }
}

checkDBConnection(sequelize);

module.exports = sequelize;
