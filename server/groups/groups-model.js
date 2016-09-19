const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Groups = sequelize.define('groups', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

sequelize
  .sync()
  .then((err) => {
    console.log('Groups model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Groups;
