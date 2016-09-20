const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const Questions = sequelize.define('questions', {
  user_id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: true
  },
  height: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  current_weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Questions.belongsTo(Users);

sequelize
  .sync()
  .then((err) => {
    console.log('Questions model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Questions;
