const Questions = require('./questions-model.js');
const Users = require('../users/users-model.js');
const utils = require('../config/utilities.js');


const questions = {

  //Endpoint to enter user questionnaire data into the database.
  '/api/questions/submitData': {
    'post': (req, res) => {
      Questions.create(req.body)
      .then((questionnaire) => {
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
          res.status(201).send({
            msg: 'Info successfully submitted.'
          });
        })
        .catch((err) => {
          res.status(400).send();
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send();
      });
    },
    'put': (req, res) => {
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
          res.status(201).send({
            msg: 'Info successfully updated.'
          });
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

module.exports = questions;
