const Comments = require('./comments-model.js');
const Posts = require('../posts/posts-model.js');

const comments = {

  //Endpoint to retrieve group messages.
  '/api/comments/getComments': {
    'get': (req, res) => {
      console.log('inside GET at /api/comments/getComments');
      Comments.findAll({
        where: {
          'post_id': req.query.post_id
        },
        attributes: [
          'id',
          'username',
          'message',
          'createdAt'
        ]
      })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  },
  
  //Endpoint to create posts
  '/api/comments/postComment': {
    'post': (req, res) => {
      console.log('inside POST at /api/comments/postComment');
      Posts.findOne({
        where: {
          id: req.body.post_id
        }
      })
      .then((post) => {
        Comments.create({
          username: req.body.username,
          message: req.body.message
        })
        .then((comment) => {
          post.addComments(comment);
          post.save();
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
  }

}

module.exports = comments;
