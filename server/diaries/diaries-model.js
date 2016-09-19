const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const diaryEntries = require('../diaryEntries-model');

const Diaries = sequelize.define('diaries', {
  user_id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  }
});

//one to many relationship
Diaries.hasMany(DiaryEntries);

sequelize
  .sync()
  .then(function(err) {
    console.log('Diaries model synced successfully.');
}, function(err) {
    console.log('An error has occurred:', err);
  });

module.exports = Diaries;
