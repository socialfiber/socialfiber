const Groups = require('./groups-model.js');
const Users = require('../users/users-model.js');

const groups = {
  //Endpoint to create groups
  '/api/groups/createGroups': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/createGroups');
      Groups.create({
        name: req.body.name,
        description: req.body.description
      })
        .then((group) => {
          console.log('New group has been created.', group);
          res.status(201).send({
            group: group
          });
        })
        .catch((err) => {
          console.log('Error: ', err);
          res.status(400).send({
            msg: 'Please fill in all fields.'
          });
        });
    }
  },
  //Endpoint to add users to groups
  '/api/groups/addUser': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/addUser');
        Groups.findOne({
          where: {
            id: req.body.group_id
          }
        })
        .then((group) => {
          Users.findOne({
            where: {
              id: req.body.user_id
            }
          })
          .then((user) => {
            console.log('user in groups ctrl: ', user)
            console.log('group in groups ctrl: ', group)
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
  },
  //Endpoint to retrieve user groups based on user id.
  '/api/groups/getUserGroups': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/getUserGroups');
      var userGroups = [];
      Groups.findAll({
        attributes: [
          'id',
          'name',
          'description'
        ],
        include: [{
          model: Users,
          through: {
            where: {
              userId: req.query.user_id
            }
          }
        }]
      })
      .then( (rows) => {
        rows.forEach((row) => {
          if(row.users.length > 0) {
            userGroups.push(row);
          }
        })
        res.json(userGroups);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  '/api/groups/getAllGroups': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/getAllGroups');
      var allGroups = [];
      Groups.findAll({
        attributes: [
          'id',
          'name',
          'description'
        ]
      })
      .then( (groups) => {
        groups.forEach((group) => {
            allGroups.push(group.dataValues);
        })
        res.json(allGroups);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  //Endpoint to leave groups
  '/api/groups/leaveGroup': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/leaveGroup');
        Groups.findOne({
          where: {
            id: req.body.group_id
          }
        })
        .then((group) => {
          Users.findOne({
            where: {
              id: req.body.user_id
            }
          })
          .then((user) => {
            group.removeUser(user);
            group.save();
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error: ', err);
            res.status(400).send({
              msg: 'Error removing user to the group!'
            });
          })
        })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send({
          msg: 'Error removing user to the group.'
        });
      })
    }
  },
  //Endpoint to retrieve all the users in a group
  '/api/groups/fetchAllUsers': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/fetchAllUsers');
      var users = [];
      Users.findAll({
        attributes: [
          'id',
          'username'
        ],
        include: [{
          model: Groups,
          through: {
            where: {
              groupId: req.query.group_id
            }
          }
        }]
      })
      .then( (rows) => {
        rows.forEach((row) => {
          if(row.groups.length > 0) {
            users.push(row);
            console.log('users:', users);
          }
        })
        res.json(users);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  }
}

module.exports = groups;
