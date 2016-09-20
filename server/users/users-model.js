const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('users', {
  diary_id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  height: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  current_weight: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

sequelize
  .sync()
  .then((err) => {
    console.log('Users model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Users;
