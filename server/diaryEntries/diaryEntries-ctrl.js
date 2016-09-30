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
        res.status(400).send();
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
            nutritionTotals.increase({
              user_id: req.body.userID,
              date: req.body.date,
              cal: data.cal*entry.qty,
              carb: data.carb*entry.qty,
              fat: data.fat*entry.qty,
              prot: data.prot*entry.qty,
              fib: data.fib*entry.qty,
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
            res.status(400).send();
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
        nutritionix.search(req.query.food)
        .then((data) => {
          nutritionTotals.decrease({
            user_id: req.query.userID,
            date: req.query.date,
            cal: data.cal*req.query.qty,
            carb: data.carb*req.query.qty,
            fat: data.fat*req.query.qty,
            prot: data.prot*req.query.qty,
            fib: data.fib*req.query.qty,
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
