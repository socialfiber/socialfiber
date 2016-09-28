const Posts = require('./posts-model.js');
const Groups = require('../groups/groups-model.js');

const posts = {
  //Endpoint to create posts
  '/api/posts/postMessage': {
    'post': (req, res) => {
      console.log('inside POST at /api/posts/postMessage');
      Groups.findOne({
        where: {
          id: req.body.group_id
        }
      })
        .then((group) => {
          Posts.create({
            group_name: req.body.group_name,
            username: req.body.username,
            message: req.body.message
          })
          .then((post) => {
            group.addPosts(post);
            group.save();
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error: ', err);
            res.status(400).send({
              msg: 'Error!'
            });
          })
        })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send({
          msg: 'Error.'
        });
      })
    }
  },
  //Endpoint to retrieve group messages.
  '/api/posts/getMessage': {
    'get': (req, res) => {
			console.log('inside GET at /api/posts/getMessage');
      var messages = [];
      Posts.findAll({
        where: {
          'group_id': req.query.group_id
        },
        attributes: [
          'id',
          'group_name',
          'username',
          'message',
          'createdAt'
        ]
      })
      .then( (rows) => {
        rows.forEach((row) => {
          if(row) {
            messages.push(row);
          }
        })
        res.json(messages);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  }
}

module.exports = posts;
