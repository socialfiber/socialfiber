const Users = require('./users/users-model.js');

const users = {
  '/api/users/createUser': {
    'post': (req, res) => {
      console.log('inside users-ctrl post');
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
    }
  }
}

module.exports = users;
