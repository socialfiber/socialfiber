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
        include: [Storage],
        order: [
          ['date', 'DESC']
        ]
      })
      .then((entries) => {
        res.status(200).json(entries);
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error fetching diary entries.'
        });
      });
		}
  },
  '/api/diaryEntries/singleEntry': {
    'post': (req, res) => {
      nutritionix.search(req.body.food)
      .then((data) => {
        if(data.message) {
          res.status(400).send({
            msg: `No results found for ${req.body.food}.`
          });
        } else {
          DiaryEntries.create({
            user_id: req.body.userID,
            date: req.body.date,
            qty: req.body.qty,
            food: req.body.food
          })
          .then((entry) => {
            nutritionTotals.increase({
              userID: req.body.userID,
              date: req.body.date,
              cal: +(data.cal*req.body.qty).toFixed(4),
              carb: +(data.carb*req.body.qty).toFixed(4),
              fat: +(data.fat*req.body.qty).toFixed(4),
              prot: +(data.prot*req.body.qty).toFixed(4),
              fib: +(data.fib*req.body.qty).toFixed(4),
              n6: +(data.n6*req.body.qty).toFixed(4)
            })
            .then((increased) => {
              res.status(201).send();
            })
            .catch((err) => {
              res.status(400).send({
                msg: 'Error increasing nutrition totals.'
              });
            })
          })
          .catch((err) => {
            res.status(400).send({
              msg: 'Error creating diary entry.'
            });
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error searching API.'
        });
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
            userID: req.query.userID,
            date: req.query.date,
            cal: +(data.cal*req.query.qty).toFixed(4),
            carb: +(data.carb*req.query.qty).toFixed(4),
            fat: +(data.fat*req.query.qty).toFixed(4),
            prot: +(data.prot*req.query.qty).toFixed(4),
            fib: +(data.fib*req.query.qty).toFixed(4),
            n6: +(data.n6*req.query.qty).toFixed(4)
          })
          .then((decreased) => {
            res.status(201).send();
          })
          .catch((err) => {
            res.status(400).send({
              msg: 'Error decreasing nutrition totals.'
            });
          });
        })
        .catch((err) => {
          res.status(400).send({
            msg: 'Error creating diary entry.'
          });
        });
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error deleting diary entry.'
        });
      });
    }
  }
}

module.exports = diaryEntries;
