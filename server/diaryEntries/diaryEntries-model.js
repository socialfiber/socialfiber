const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const DiaryEntries = sequelize.define('diaryEntries', {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  food: {
    type: Sequelize.STRING,
    allowNull: false
  }
});



sequelize
  .sync()
  .then((err) => {
    console.log('Diary Entries model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = DiaryEntries;
