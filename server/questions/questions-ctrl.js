const Questions = require('./questions-model.js');
const Users = require('../users/users-model.js');
const utils = require('../config/utilities.js');

const questions = {
  //Endpoint to enter survey data into the database.
  '/api/questions/enterData': {
    'post': (req, res) => {
      console.log('inside POST at /api/questions/enterData');
      Questions.create({
        user_id: req.body.user_id,
        height: req.body.height,
        age: req.body.age,
        weight: req.body.weight,
        gender: req.body.gender,
        preg: req.body.preg,
        lact: req.body.lact
      })
        .then(() => {
          console.log('New questionnaire data has been created.');
          const dietaryInfo = utils.generateDietaryInfo(req.body);
          Users.update({
            IBW: dietaryInfo.IBW,
            cal_min: dietaryInfo.cal_min,
            cal_max: dietaryInfo.cal_max,
            code: dietaryInfo.code
          },
          {
            where: {
              id: req.body.user_id
            }
          })
          .then((updated) => {
            res.status(201).send();
          })
          .catch((err) => {
            res.status(400).send();
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
  //Endpoint to retrieve survey data from the database.
  '/api/questions/getData': {
    'get': (req, res) => {
			console.log('inside GET at /api/questions/enterData');
      Questions.findOne({
        where: {
          user_id: req.query.userID
        },
        attributes: [
          'user_id',
          'height',
          'age',
          'weight',
          'gender'
        ]
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  //Endpoint to update user data in the database.
  '/api/questions/updateData': {
    'post': (req, res) => {
      console.log("inside POST at /api/questions/updateData");
      Questions.update(
        {
          height: req.body.height,
          age: req.body.age,
          weight: req.body.weight,
          gender: req.body.gender,
          preg: req.body.preg,
          lact: req.body.lact
        },
        {
          where: {
            user_id: req.body.user_id
          }
        }
      )
      .then((questionnaire) => {
        console.log('New questionnaire data has been created.');
        const dietaryInfo = utils.generateDietaryInfo(req.body);
        Users.update({
          IBW: dietaryInfo.IBW,
          cal_min: dietaryInfo.cal_min,
          cal_max: dietaryInfo.cal_max,
          code: dietaryInfo.code
        },
        {
          where: {
            id: req.body.user_id
          }
        })
        .then((updated) => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(400).send();
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send({
          msg: 'Please fill in all fields.'
        });
      });
    }
  }
}

module.exports = questions;
