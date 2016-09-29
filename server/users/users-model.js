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
  .then((err) => {
    console.log('Users model synced successfully.');
}, (err) => {
    console.log('An error has occurred:', err);
    res.send(err.message);
  });

module.exports = Users;
