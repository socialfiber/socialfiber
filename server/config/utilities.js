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
    return new Promise((resolve, reject) => {
      bcrypt.hash(input, 10, (error, hash) => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
  },

  comparePassword: (input, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(input, hash, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  generateDietaryProfileCode: (user) => {
    return new Promise((resolve, reject) => {
      var code;
      if(user.lact) {code = 'lact0'}
      else if(user.preg) {code = 'preg0'}
      else if(user.age<=3) {code = 'child0'}
      else if(user.age<=8) {code = 'child1'}
      else {
        var word = user.gender
        if(user.age<=13) {word+='0'}
        else if(user.age<=18) {word+='1'}
        else if(user.age<=30) {word+='2'}
        else if(user.age<=50) {word+='3'}
        else if(user.age>50) {word+='4'}
        code = word;
      }
      resolve(code);
    });
  }

}

module.exports = utilities;
