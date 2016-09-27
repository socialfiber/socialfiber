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
          'name',
          'description'
        ]
      })
      .then( (groups) => {
        groups.forEach((group) => {
            allGroups.push(group);
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
      console.log('req body group id inside leaveGroup post: ', req.body.group_id);
      console.log('req body user id inside leaveGroup post: ', req.body.user_id);


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
            console.log('user inside leavegroup endpoint: ', user);
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
  }
}

module.exports = groups;
