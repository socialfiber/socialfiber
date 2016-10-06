const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');


const middleware = {

  //checks token
  auth: (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(401).send({
        msg: 'No token.'
      });
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret');
        if (decoded.exp <= moment().unix()) {
          res.status(401).send({
            msg: 'Expired token.'
          });
        }
        Users.findById(decoded.sub)
        .then((user) => {
          next();
        })
        .catch((err) => {
          res.status(401).send({
            msg: 'User does not exist.'
          });
        });
      } catch (err) {
        res.status(401).send({
          msg: 'Invalid token.'
        });
      }
    }
  }

};

module.exports = middleware;
