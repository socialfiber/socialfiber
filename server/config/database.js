const auth = require('./auth.js');


const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  auth.mysql.database,
  auth.mysql.username,
  auth.mysql.password,
  {
    host: auth.mysql.hostname,
    dialect: 'mysql',
    options: {
      timezone: 'America/Los_Angeles'
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DB.');
  });

module.exports = sequelize;
