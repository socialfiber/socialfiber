const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Groups = require('../groups/groups-model.js');


const Posts = sequelize.define('posts', {
  group_id: {
    type: Sequelize.INTEGER,
    unique: false
  },
  userName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  postMessage: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});


Groups.hasMany(Posts);

sequelize
  .sync()
  .then((err) => {
    console.log('Posts model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Posts;
