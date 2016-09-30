const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const Questions = sequelize.define('questions', {
  height: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  preg: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  lact: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

Questions.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasOne(Questions, { foreignKey: 'user_id' });

sequelize
  .sync()
  .then(() => {
    console.log('Questions model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = Questions;
