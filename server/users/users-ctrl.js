const Users = require('./users-model.js');
const utils = require('../config/utilities.js');

const users = {
  '/api/users/createUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/users/createUser');
      const newUser = Users.build({
        username: req.body.username,
        password: req.body.password
      });
      newUser
        .save()
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
  '/api/users/getUserData': {
    'get': (req, res) => {
      var userData = [];
      console.log('inside GET at /api/users/getUserData', req.query);
      const getUser = Users.findAll({
        attributes: [
          'id',
          'username',
          'diary_id'
          // 'height',
          // 'age',
          // 'current_weight',
          // 'gender'
        ]
      })
      .then( (users) => {
        users.forEach( (user) => {
          console.log('user : ', user);
          userData.push(user);
        });
        console.log('sending data');
        console.log('userData: ', userData);
        res.json(userData);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.send(err.message);
      });
    }
  }
}

module.exports = users;
