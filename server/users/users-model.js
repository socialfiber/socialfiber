const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const DietaryProfiles = require('../dietaryProfiles/dietaryProfiles-model.js');

const Users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  code: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Users.belongsTo(DietaryProfiles, { foreignKey: 'code', targetKey: 'code' });
DietaryProfiles.hasMany(Users, { foreignKey: 'code' });

sequelize
  .sync()
  .then((err) => {
    console.log('Users model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
    res.send(err.message);
  });

module.exports = Users;
