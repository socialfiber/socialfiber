const Sequelize = require('sequelize');
const sequelize = new Sequelize('tml_1001', 'tmluser', 'healthy1001', {
  host: 'mysql.kanadachi.com',
  dialect: 'mysql',
  options: {
  timezone: 'America/Los_Angeles'
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DB.');
  });

module.exports = sequelize;
