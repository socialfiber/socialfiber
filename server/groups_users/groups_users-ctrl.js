const Groups = require('../groups/groups-model.js');
const Users = require('../users/users-model.js');
const Groups_Users = require('./groups_users-model.js');

const groups_users = {
  '/api/groups_users/addUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups_users/addUser');
      const newGroup_User = Groups_Users.build({
        group_id: req.body.group_id,
        user_id: req.body.user_id
      });
      newGroup_User
        .save()
        .then(() => {
          console.log('New groups_users relationship has been created.');
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error: ', err);
          res.status(400).send({
            msg: 'There has been an error.'
          });
        });
    }
  }
}

module.exports = groups_users;
