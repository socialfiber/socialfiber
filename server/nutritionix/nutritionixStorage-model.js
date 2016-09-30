const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const DiaryEntries = require('../diaryEntries/diaryEntries-model');

const Storage = sequelize.define('storage', {
  food: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  api_name: {
    type: Sequelize.STRING,
    allowNull: false
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
  prot: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fib: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n6: {
    type: Sequelize.REAL,
    allowNull: false
  }
});

Storage.belongsTo(DiaryEntries, { foreignKey: 'food' });
DiaryEntries.hasOne(Storage, { foreignKey: 'food' });

sequelize
  .sync()
  .then(() => {
    console.log('Storage model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Storage;
