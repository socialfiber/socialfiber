const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Chatrooms = sequelize.define('chatrooms', {
  room_id: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(() => {
    console.log('Chatrooms model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = Chatrooms;
