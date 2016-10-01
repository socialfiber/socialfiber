const Users = require('./users-model.js');
const Questions = require('../questions/questions-model.js');
const DietaryProfiles = require('../dietaryProfiles/dietaryProfiles-model.js');
const NutritionTotals = require('../nutritionTotals/nutritionTotals-model.js');
const utils = require('../config/utilities.js');

const users = {
  'signup': (req, res) => {
    console.log('inside POST at /auth/signup');
    Users.create({
      username: req.body.username,
      password: req.body.password
    })
    .then((user) => {
      utils.hashPassword(req.body.password)
      .then((hash) => {
        user.update({ password: hash })
        .then((updated) => {
          const token = utils.generateToken(user);
          res.status(201).send({
            token: token,
            user: { id: user.id, username: user.username }
          });
        })
        .catch((err) => {
          res.status(200).send({
            msg: err
          });
        });
      })
      .catch((err) => {
        res.status(200).send({
          msg: 'Error hashing password.'
        });
      });
    })
    .catch((err) => {
      res.status(200).send({
        msg: 'The username you have selected already exists.'
      });
    });
  },
  'signin': (req, res) => {
    console.log('inside POST at /auth/signin');
    Users.findOne({
      where: {
        username: req.body.username
      },
      attributes: ['id', 'username', 'password']
    })
    .then((user) => {
      utils.comparePassword(req.body.password, user.password)
      .then((isMatch) => {
        if(isMatch) {
          const token = utils.generateToken(user);
          res.status(201).send({
            token: token,
            user: { id: user.id, username: user.username }
          });
        } else {
          res.status(200).send({
            msg: 'Incorrect Password.'
          })
        }
      })
    })
    .catch((err) => {
      res.status(200).send({
        msg: 'The username you have selected does not exist.'
      });
    });
  },
  '/api/users/getUserData': {
    'get': (req, res) => {
      console.log('inside GET at /api/users/getUserData');
      Users.findOne({
        where: {
          id: req.query.userID
        },
        attributes: ['id', 'username', 'IBW', 'cal_min', 'cal_max', 'code'],
        include: [DietaryProfiles, Questions, NutritionTotals]
      })
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error getting user data.'
        });
      });
    }
  },
  '/api/users/browse/:userID': {
    'get': (req, res) => {
      console.log('inside GET at /api/users/browse/:id');
      Users.findOne({
        where: {
          id: req.params.userID //change to grab from endpoint
        },
        attributes: ['username'], //add privacy later
        include: [DietaryProfiles, NutritionTotals] //add some of their food diary
      })
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error getting user data.'
        });
      });
    }
  }
}

module.exports = users;
