const Users = require('./users-model.js');
const Questions = require('../questions/questions-model.js');
const DietaryProfiles = require('../dietaryProfiles/dietaryProfiles-model.js');
const utils = require('../config/utilities.js');

const users = {
  '/api/users/createUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/users/createUser');
      Users.create({
        username: req.body.username,
        password: req.body.password
      })
        .then((user) => {
          utils.hashPassword(req.body.password)
          .then((hash) => {
            user.update({ password: hash });
          })
          .catch((err) => {
            console.log("Password hashing error: ", err)
          });
          const token = utils.generateToken(user);
          res.status(201).send({
            token: token,
            user: user
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({
            msg: 'The username you have selected already exists.'
          });
        });
    }
  },
  //Endpoint that allows users to login.
  '/api/users/login': {
    'post': (req, res) => {
      console.log('inside POST at /api/users/login');
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
              user: user
            });
          } else {
            res.status(400).send({
              msg: 'Incorrect Password.'
            })
          }
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          msg: 'The username you have selected does not exist.'
        });
      });
    }
  },
  //Endpoint that retrieves user data such as user id and username.
  '/api/users/getUserData': {
    'get': (req, res) => {
      console.log('inside GET at /api/users/getUserData', req.query);
      Users.findOne({
        where: {
          id: req.query.userID
        },
        include: [DietaryProfiles, Questions]
      })
      .then((userData) => {
        console.log('userData: ', userData);
        res.status(200).json(userData);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.send(err.message);
      });
    }
  }
}

module.exports = users;
