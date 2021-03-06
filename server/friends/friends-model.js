const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model.js');


const Friends = sequelize.define('friends', {
  user1_username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user2_username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Friends.belongsTo(Users, { foreignKey: 'user1_id' });
Friends.belongsTo(Users, { foreignKey: 'user2_id' });
Users.hasMany(Friends, { foreignKey: 'user1_id' });

sequelize
  .sync()
  .then(() => {
    console.log('Friends model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = Friends;
