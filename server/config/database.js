const Sequelize = require('sequelize');
const sequelize = new Sequelize('thesisDB', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '8080',
  options: {
  timezone: 'America/Los_Angeles'
  }
});

sequelize
  .authenticate()
  .then((err) => {
    console.log('Connected to DB.');
  })
  .catch((err) => {
    console.log('Unable to connect to the DB.');
  });

module.exports = sequelize;
