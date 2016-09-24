const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model.js');
const Groups = require('../groups/groups-model.js');

// const Groups_Users = sequelize.define('groups_users', {
//   group_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }
// });

// Groups.belongsToMany(Users, {through: Groups_Users});
// Users.belongsToMany(Groups, {through: Groups_Users});

//user has many groups
// 
// sequelize
//   .sync()
//   .then((err) => {
//     console.log('Groups_Users model synced successfully.');
// }, (err) => {
//     console.log('An error has occurred:', err);
//   });

//module.exports = Groups_Users;
