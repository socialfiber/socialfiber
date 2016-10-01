const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

const utilities = {

  generateToken: (user) => {
    const payload = {
      iss: 'tml',
      sub: user.id,
      iat: moment().unix(),
      exp: moment().add(1, 'days').unix()
    }
    console.log("GENERATING TOKEN", payload)
    return jwt.sign(payload, 'secret');
  },

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

  generateDietaryInfo: (user) => {
    var IBW = user.gender === 'male' ? 106 : 100;
    IBW += user.height > 60 ? (user.height-60)*6 : (user.height-60)*5;
    var cal_min = Math.round(IBW/2.2*25);
    var cal_max = Math.round(IBW/2.2*25);
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
    return { code: code, IBW: IBW, cal_min: cal_min, cal_max: cal_max }
  }

}

module.exports = utilities;
