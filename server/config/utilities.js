const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');

const utilities = {

  hashPassword: (input) => {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(input, 10, function(error, hash) {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
  },

  comparePassword: (input, hash) => {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(input, hash, function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

}

module.exports = utilities;
