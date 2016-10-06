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
  prot: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  fib: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  n6: {
    type: Sequelize.REAL,
    allowNull: false,
    defaultValue: 0
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

NutritionTotals.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(NutritionTotals, { foreignKey: 'user_id' })

sequelize
  .sync()
  .then(() => {
    console.log('Nutrition Totals model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = NutritionTotals;
