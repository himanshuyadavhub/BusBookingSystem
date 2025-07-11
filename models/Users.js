const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/db-connection");

const Users = sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(60),
        unique:true,
        allowNull:false
    }
})

module.exports = Users;