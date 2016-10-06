const Comments = require('./comments-model.js');
const Posts = require('../posts/posts-model.js');

const comments = {
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
  '/api/comments/getComments': {
    'get': (req, res) => {
			console.log('inside GET at /api/comments/getComments');
      var messages = [];
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

module.exports = comments;
