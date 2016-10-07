const Users = require('./users-model.js');
const Questions = require('../questions/questions-model.js');
const DietaryProfiles = require('../dietaryProfiles/dietaryProfiles-model.js');
const NutritionTotals = require('../nutritionTotals/nutritionTotals-model.js');
const Friends = require('../friends/friends-model.js');
const ProfilePics = require('../profilePics/profilePics-model.js');
const utils = require('../config/utilities.js');


const users = {

  'signup': (req, res) => {
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
          res.status(400).send({
            msg: 'Error updating password to hash.'
          });
        });
      })
      .catch((err) => {
        res.status(400).send({
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
    Users.findOne({
      where: {
        username: req.body.username
      }
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
          });
        }
      })      
      .catch((err) => {
        res.status(400).send({
          msg: 'Error comparing passwords.'
        });
      });
    })
    .catch((err) => {
      res.status(200).send({
        msg: 'The username you have selected does not exist.'
      });
    });
  },

  '/api/users/changePassword': {
    'put': (req, res) => {
      Users.findById(req.body.userID)
      .then((user) => {
        utils.comparePassword(req.body.password, user.password)
        .then((isMatch) => {
          if(isMatch) {
             utils.hashPassword(req.body.newPW)
            .then((hash) => {
              user.update({ password: hash })
              .then((updated) => {
                res.status(201).send({
                  msg: 'Password successfully updated.'
                });
              })
              .catch((err) => {
                res.status(400).send({
                  msg: 'Error updating password to hash.'
                });
              });
            });
          } else {
            res.status(200).send({
              msg: 'Incorrect Password.'
            });
          }
        })
        .catch((err) => {
          res.status(400).send({
            msg: 'Error comparing passwords.'
          });
        });
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error changing password.'
        });
      });
    }
  },

  '/api/users/getUserData': {
    'get': (req, res) => {
      const options = {
        attributes: ['id', 'username', 'IBW', 'cal_min', 'cal_max', 'code'],
        include: [DietaryProfiles, Questions, NutritionTotals, Friends, ProfilePics]
      }
      Users.findById(req.query.userID, options)
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

  '/api/users/browse/:id': {
    'get': (req, res) => {
      const options = {
        attributes: ['username', 'privacy'],
        include: [DietaryProfiles, Questions, NutritionTotals, Friends, ProfilePics]
      }
      Users.findById(req.params.id, options)
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

  '/api/users/getAllUsers': {
    'get': (req, res) => {
      Users.findAll({
        attributes: ['id', 'username']
      })
      .then((users) => {
        res.status(200).json(users);
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
