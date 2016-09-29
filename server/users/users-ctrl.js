const Users = require('./users-model.js');
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
            newUser.update({ password: hash });
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
<<<<<<< fbeee33c3b57783a84f52f7ce987619dedd8e279
      var userData = [];
      console.log('inside GET at /api/users/getUserData');
      const getUser = Users.findAll({
        attributes: [
          'id',
          'username',
          'diary_id'
        ]
      })
      .then( (users) => {
        users.forEach( (user) => {
          userData.push(user);
        });
        res.json(userData);
=======
      var userData = [];
      console.log('inside GET at /api/users/getUserData');
      const getUser = Users.findAll({
        attributes: [
          'id',
          'username',
          'diary_id'
        ]
      })
      .then( (users) => {
        users.forEach( (user) => {
          userData.push(user);
        });
        res.json(userData);
>>>>>>> [feature] sends dietary profile with user
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.send(err.message);
      });
    }
  }
}

module.exports = users;
