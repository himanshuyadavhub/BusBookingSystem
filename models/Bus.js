const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Bus = sequelize.define("buses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  busNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Bus;
