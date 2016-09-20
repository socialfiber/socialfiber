const Users = require('./users-model.js');

const users = {
  '/api/users/createUser': {
    'post': (req, res) => {
      console.log('Inside users-ctrl post');
      const newUser = Users.build({
        username: req.body.username,
        diary_id: req.body.diary_id,
        height: req.body.height,
        age: req.body.age,
        current_weight: req.body.current_weight,
        gender: req.body.gender
      });
      newUser
        .save()
        .then(() => {
          console.log('New user has been created.');
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    },
    'get': (req, res) => {
			console.log('inside GET at /dummy_endpoint');
			res.end('inside GET at /dummy_endpoint');
		}
  },
  '/api/users/getUserData': {
    'get': (req, res) => {
      var userData = [];
      console.log('Inside users-ctrl get', req.query);
      const getUser = Users.findAll({
        attributes: [
          'username',
          'diary_id',
          'height',
          'age',
          'current_weight',
          'gender'
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
        res.send(err);
      });
    },
    'post': (req, res) => {
			console.log('inside GET at /dummy_endpoint');
			res.end('inside GET at /dummy_endpoint');
		}
  }
}

module.exports = users;
