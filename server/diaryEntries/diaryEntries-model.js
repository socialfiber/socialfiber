const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

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

DiaryEntries.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(DiaryEntries, { foreignKey: 'user_id' });

sequelize
  .sync()
  .then((err) => {
    console.log('Diary Entries model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = DiaryEntries;
