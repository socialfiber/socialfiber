const Sequelize = require('sequelize');
const sequelize = require('../config/database');


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
  privacy: {
    type: Sequelize.STRING,
    allowNull: true,
    default: 'private'
  },
  // diets: {
  //   type: Sequelize.ARRAY,
  //   allowNull: false,
  //   default: []
  // },
  IBW: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  cal_min: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  cal_max: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  code: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

sequelize
  .sync()
  .then(() => {
    console.log('Users model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = Users;
