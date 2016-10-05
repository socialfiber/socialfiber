const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model.js');


const Groups = sequelize.define('groups', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


Groups.belongsToMany(Users, {through: 'Groups_Users'});
Users.belongsToMany(Groups, {through: 'Groups_Users'});

sequelize
  .sync()
  .then((err) => {
    console.log('Groups model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Groups;
