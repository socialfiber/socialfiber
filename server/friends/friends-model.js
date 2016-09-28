const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model.js');

const Friends = sequelize.define('friends', {
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Friends.belongsTo(Users, {foreignKey: 'user1_id'});
Friends.belongsTo(Users, {foreignKey: 'user2_id'});

sequelize
  .sync()
  .then((err) => {
    console.log('Friends model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Friends;
