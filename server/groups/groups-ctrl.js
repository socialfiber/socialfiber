const Groups = require('./groups-model.js');
const Users = require('../users/users-model.js');
// const Groups_Users = require('../groups_users/groups_users-model.js');

const groups = {
  '/api/groups/createGroups': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/createGroups');
      const newGroup = Groups.build({
        group_id: req.body.group_id,
        name: req.body.name,
        description: req.body.description
      });
      newGroup
        .save()
        .then(() => {
          console.log('New group has been created.');
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error: ', err);
          res.status(400).send({
            msg: 'Please fill in all fields.'
          });
        });
    }
  },
  '/api/groups/addUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/addUser');
        Groups.findOne({
          where: {
            group_id: req.body.group_id
          }
        })
        .then((group) => {
          Users.findOne({
            where: {
              id: req.body.user_id
            }
          })
          .then((user) => {
            group.addUsers(user);
            group.save();
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error: ', err);
            res.status(400).send({
              msg: 'Error adding user to the group!'
            });
          })
        })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send({
          msg: 'Error adding user to the group.'
        });
      })
    }
  }
}

module.exports = groups;
