const Groups = require('./groups-model.js');
const Users = require('../users/users-model.js');
const _ = require('underscore');


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
        res.status(201).send({
          group: group
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send();
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
            group.addUsers(user);
            group.save();
            res.status(201).send();
          })
          .catch((err) => {
            res.status(400).send();
          });
        })
      .catch((err) => {
        res.status(400).send();
      });
    }
  },

  //Endpoint to retrieve user groups based on user id.
  '/api/groups/getUserGroups': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/getUserGroups');
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
      .then((userGroups) => {
        res.status(200).json(userGroups);
      })
      .catch( (err) => {
        res.status(400).send(err.message);
      });
		}
  },

  //browse all groups
  '/api/groups/getAllGroups': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/getAllGroups');
      Groups.findAll({
        attributes: [
          'id',
          'name',
          'description'
        ]
      })
      .then((groups) => {
        res.status(200).json(groups);
      })
      .catch((err) => {
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
            res.status(201).send();
          })
          .catch((err) => {
            res.status(400).send();
          })
        })
      .catch((err) => {
        res.status(400).send();
      })
    }
  },

  //Endpoint to retrieve all the users in a group
  '/api/groups/fetchAllUsers': {
    'get': (req, res) => {
			console.log('inside GET at /api/groups/fetchAllUsers');
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
      .then((users) => {
        users = users.filter((user) => user.groups.length > 0);
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).send();
      });
		}
  }

}

module.exports = groups;
