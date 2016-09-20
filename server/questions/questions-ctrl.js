const Questions = require('./questions-model.js');

const questions = {
  '/api/questions/enterData': {
    'post': (req, res) => {
      console.log('Inside questions-ctrl post');
      const newQuestionData = Questions.build({

        user_id: req.body.user_id,
        height: req.body.height,
        age: req.body.age,
        current_weight: req.body.weight,
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
        });
    },
    'get': (req, res) => {
			console.log('inside GET at /dummy_endpoint');
			res.end('inside GET at /dummy_endpoint');
		}
  }
}

module.exports = questions;
