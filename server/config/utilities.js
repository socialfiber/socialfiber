const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const utilities = {
  generateToken: (user) => {
    const payload = {
      iss: 'tml',
      sub: user.id
    }
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload, 'secret', options);
  },

  // checkAuthentication: () => {
  //   const token = 
  //   try {
  //     return jwt.verify(token, 'secret');
  //   } catch (err) {
  //     return false;
  //   }
  // },

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
