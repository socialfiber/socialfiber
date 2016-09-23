const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Storage = sequelize.define('storage', {
  food: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  carbs: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fats: {
    type: Sequelize.REAL,
    allowNull: false
  },
  proteins: {
    type: Sequelize.REAL,
    allowNull: false
  }
});

sequelize
  .sync()
  .then((err) => {
    console.log('Storage model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Storage;
