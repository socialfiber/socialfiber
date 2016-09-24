const Questions = require('./questions-model.js');

const questions = {
  //Endpoint to enter survey data into the database.
  '/api/questions/enterData': {
    'post': (req, res) => {
      console.log('inside POST at /api/questions/enterData', req.body);
      const newQuestionData = Questions.build({
        user_id: req.body.user_id,
        height: req.body.height,
        age: req.body.age,
        weight: req.body.weight,
        gender: req.body.gender
      });
      newQuestionData
        .save()
        .then(() => {
          console.log('New questionnaire data has been created.');
          res.sendStatus(201);
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
      var userData = [];
      const getUserSurveyData = Questions.findAll({
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
      .then( (users) => {
        users.forEach( (user) => {
          console.log('user : ', user);
          userData.push(user);
        });
        console.log('sending data');
        console.log('userData: ', userData);
        res.json(userData);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  }
}

module.exports = questions;
