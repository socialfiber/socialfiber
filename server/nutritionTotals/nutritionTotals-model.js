const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const NutritionTotals = sequelize.define('nutritionTotals', {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  cal: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  carb: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  fat: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  protein: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  fiber: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  n6: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  }
});

NutritionTotals.belongsTo(Users, {foreignKey: 'user_id'});

sequelize
  .sync()
  .then(() => {
    console.log('Nutrition Totals model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = NutritionTotals;
