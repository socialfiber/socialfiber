const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Groups = require('../groups/groups-model.js');


const Posts = sequelize.define('posts', {
  group_id: {
    type: Sequelize.INTEGER,
    unique: false
  },
  group_name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Groups.hasMany(Posts, {foreignKey: 'group_id'});

sequelize
  .sync()
  .then(() => {
    console.log('Posts model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Posts;
