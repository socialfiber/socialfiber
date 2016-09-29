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
		 console.log('req.body: ', req.body)
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
						console.log('entry: ', entry)
            nutritionTotals.increase({
              user_id: req.body.userID,
              date: req.body.date,
              cal: data.cal*entry.qty,
              carb: data.carb*entry.qty,
              fat: data.fat*entry.qty,
              protein: data.protein*entry.qty,
              fiber: data.fiber*entry.qty,
              n6: data.n6*entry.qty
            })
            .then((increased) => {
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
      console.log(req.query)
      DiaryEntries.destroy({
        where: {
          id: req.query.id
        }
      })
      .then((affectedRows) => {
        nutritionix.search(req.query.food)
        .then((data) => {
          console.log("DATA FROM SEARCH", data)
          nutritionTotals.decrease({
            user_id: req.query.userID,
            date: req.query.date.substr(0,10),
            cal: data.cal*req.query.qty,
            carb: data.carb*req.query.qty,
            fat: data.fat*req.query.qty,
            protein: data.protein*req.query.qty,
            fiber: data.fiber*req.query.qty,
            n6: data.n6*req.query.qty
          })
          .then((decreased) => {
            res.status(201).send();
          })
          .catch((err) => {
            res.status(400).send();
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

module.exports = diaryEntries;
