const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const ProfilePics = sequelize.define('profilePics', {
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

ProfilePics.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(ProfilePics, { foreignKey: 'user_id' });

sequelize
  .sync()
  .then(() => {
    console.log('Profile Pics model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = ProfilePics;
