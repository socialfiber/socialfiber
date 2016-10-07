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
        Groups.findById(req.body.groupID)
        .then((group) => {
          Users.findOne({
            where: {
              id: req.body.userID
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
  '/api/groups/userGroups': {
    'get': (req, res) => {
      console.log('inside GET at /api/groups/userGroups');
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
              userId: req.query.userID
            }
          }
        }]
      })
      .then((userGroups) => {
        userGroups = userGroups.filter((group) => group.users.length);
        res.status(200).json(userGroups);
      })
      .catch( (err) => {
        res.status(400).send(err.message);
      });
    }
  },

  //browse all groups
  '/api/groups/allGroups': {
    'get': (req, res) => {
      console.log('inside GET at /api/groups/allGroups');
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
        res.status(400).send();
      });
    }
  },

  //Endpoint to leave groups
  '/api/groups/leaveGroup': {
    'post': (req, res) => {
      console.log('inside POST at /api/groups/leaveGroup');
      Groups.findById(req.body.groupID)
      .then((group) => {
        Users.findOne({
          where: {
            id: req.body.userID
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
      });
    }
  },

  //Endpoint to retrieve all the users in a group
  '/api/groups/groupUsers': {
    'get': (req, res) => {
      console.log('inside GET at /api/groups/groupUsers');
      Users.findAll({
        attributes: [
          'id',
          'username'
        ],
        include: [{
          model: Groups,
          through: {
            where: {
              groupId: req.query.groupID
            }
          }
        }]
      })
      .then((users) => {
        users = users.filter((user) => user.groups.length);
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  },

    //Endpoint to retrieve user group status
  '/api/groups/groupStatus': {
    'get': (req, res) => {
      console.log('inside GET at /api/groups/groupStatus');
      Users.findAll({
        attributes: [
          'id',
          'username'
        ],
        include: [{
          model: Groups,
          through: {
            where: {
              groupId: req.query.groupID
            }
          }
        }]
      })
      .then((users) => {
        users = users.filter((user) => user.groups.length > 0);
        const status = _.findWhere(users, {id: +req.query.userID}) ? true : false;
        res.status(200).send({
          status: status
        });
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  }

}

module.exports = groups;
