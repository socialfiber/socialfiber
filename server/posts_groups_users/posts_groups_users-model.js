//posts join table model

const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model.js');
const Groups = require('../groups/groups-model.js');

const Posts_Groups_Users = sequelize.define('posts_groups_users', {
  posts: {
    type: Sequelize.STRING,
    allowNull: false
  },
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Groups.belongsToMany(Users, {through: Posts_Groups_Users});
Users.belongsToMany(Groups, {through: Posts_Groups_Users});

sequelize
  .sync()
  .then((err) => {
    console.log('Posts_Groups_Users model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Posts_Groups_Users;
