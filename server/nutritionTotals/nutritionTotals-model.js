const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const NutritionTotals = sequelize.define('nutritionTotals', {
  date: {
    type: Sequelize.DATEONLY,
    unique: true,
    allowNull: false,
  },
  cal: {
    type: Sequelize.REAL,
    allowNull: false
  },
  carb: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fat: {
    type: Sequelize.REAL,
    allowNull: false
  },
  protein: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fiber: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n6: {
    type: Sequelize.REAL,
    allowNull: false
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
