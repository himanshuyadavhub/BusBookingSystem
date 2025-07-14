const Users = require('./Users');
const Bus = require('./Bus');
const Bookings = require('./Bookings');

// Associations

// User <--> Booking
Users.hasMany(Bookings, { foreignKey: 'userId', onDelete: 'CASCADE' });
Bookings.belongsTo(Users, { foreignKey: 'userId' });

// Bus <--> Booking
Bus.hasMany(Bookings, { foreignKey: 'busId', onDelete: 'CASCADE' });
Bookings.belongsTo(Bus, { foreignKey: 'busId' });

module.exports = {
  Users,
  Bus,
  Bookings,
};
