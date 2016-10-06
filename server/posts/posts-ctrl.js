const Posts = require('./posts-model.js');
const Groups = require('../groups/groups-model.js');
const Comments = require('../comments/comments-model.js');


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

  //Endpoint to retrieve group messages.
  '/api/posts/getMessage': {
    'get': (req, res) => {
			console.log('inside GET at /api/posts/getMessage');
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
        ],
        include: [Comments]
      })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch( (err) => {
        res.status(400).send();
      });
		}
  }
  
}

module.exports = posts;
