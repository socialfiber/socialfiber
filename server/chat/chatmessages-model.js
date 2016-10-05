const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Chatrooms = require('./chatrooms-model.js');

const ChatMessages = sequelize.define('chatMessages', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

ChatMessages.belongsTo(Chatrooms, {foreignKey: 'room_id', target: 'room_id'});
Chatrooms.hasMany(ChatMessages, {foreignKey: 'room_id'});

sequelize
  .sync()
  .then(() => {
    console.log('Chat Messages model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = ChatMessages;
