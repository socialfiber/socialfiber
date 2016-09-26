const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const DietaryProfiles = sequelize.define('dietaryProfiles', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  carb: {
    type: Sequelize.REAL,
    allowNull: false
  },
  carb_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  carb_max: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fat: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fat_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fat_max: {
    type: Sequelize.REAL,
    allowNull: false
  },
  protein: {
    type: Sequelize.REAL,
    allowNull: false
  },
  protein_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  protein_max: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fiber: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n6: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n6_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n6_max: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n3: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n3_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  n3_max: {
    type: Sequelize.REAL,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(() => {
    console.log('Dietary Profiles model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
    res.send(err.message);
  });

module.exports = DietaryProfiles;
