const Groups = require('../groups/groups-model.js');
const Users = require('../users/users-model.js');
const Groups_Users = require('./groups_users-model.js');

const groups_users = {
  '/api/groups_users/addUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups_users/addUser');
      // Groups_Users.create({
      //   g_id: req.body.group_id,
      //   u_id: req.body.user_id
      // })
      //   .then((group_user) => {
      //     console.log('groups_users: ',group_user);
      //     console.log('New groups_users relationship has been created.');
      //     res.sendStatus(201);
      //   })
      //   .catch((err) => {
      //     console.log('Error: ', err);
      //     res.status(400).send({
      //       msg: 'There has been an error.'
      //     });
      //   });
    }
  }
}

module.exports = groups_users;
