const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Users = require('../users/users-model');

const DietaryProfiles = sequelize.define('dietaryProfiles', {
  code: {
    type: Sequelize.STRING,
    unique: true,
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
  prot: {
    type: Sequelize.REAL,
    allowNull: false
  },
  prot_min: {
    type: Sequelize.REAL,
    allowNull: false
  },
  prot_max: {
    type: Sequelize.REAL,
    allowNull: false
  },
  fib: {
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

Users.belongsTo(DietaryProfiles, { foreignKey: 'code', targetKey: 'code' });
DietaryProfiles.hasMany(Users, { foreignKey: 'code' });

sequelize
  .sync()
  .then(() => {
    console.log('Dietary Profiles model synced successfully.');
  }, (err) => {
    console.error('An error has occurred:', err);
  });

module.exports = DietaryProfiles;
