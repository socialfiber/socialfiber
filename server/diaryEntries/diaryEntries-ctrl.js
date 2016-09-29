const DiaryEntries = require('./diaryEntries-model.js');
const Storage = require('../nutritionix/nutritionixStorage-model.js');
const nutritionix = require('../nutritionix/nutritionix-ctrl.js');
const nutritionTotals = require('../nutritionTotals/nutritionTotals-ctrl.js');

const diaryEntries = {
	'/api/diaryEntries/allEntries': {
		'get': (req, res) => {
      const getDiaryEntry = DiaryEntries.findAll({
        where: {
          user_id: req.query.userID
        },
        order: [
          ['date', 'DESC']
        ]
      })
      .then((entries) => {
        res.status(200).json(entries);
      })
      .catch((err) => {
        console.error('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  '/api/diaryEntries/singleEntry': {
    'post': (req, res) => {
      nutritionix.search(req.body.food)
      .then((data) => {
        if(data.message) {
          res.status(400).send();
        } else {
          DiaryEntries.create({
            user_id: req.body.userID,
            date: req.body.date,
            qty: req.body.qty,
            food: req.body.food
          })
          .then((entry) => {
            console.log('New diary entry data has been created.', req.body.userID);
            nutritionTotals.increase({
              date: req.body.date,
              cal: data.cal,
              carb: data.carb,
              fat: data.fat,
              protein: data.protein,
              fiber: data.fiber,
              n6: data.n6,
              user_id: req.body.userID
            })
            .then((increased) => {
              console.log("SUCCESSFULLY INCREASED!!!!");
              res.status(201).send();
            })
            .catch((err) => {
              res.status(400).send();
            })            
          })
          .catch((err) => {
            console.error('Error: ', err);
            res.status(400).send({
              msg: 'Please fill in all fields.'
            });
          });
        }
      })
      .catch((err) => {
        res.status(400).send();
      });
		},
    'delete': (req, res) => {
      DiaryEntries.destroy({
        where: {
          id: req.query.id
        }
      })
      .then((affectedRows) => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  }
}

module.exports = diaryEntries;
