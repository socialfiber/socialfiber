const DiaryEntries = require('./diaryEntries-model.js');
const nutritionix = require('../nutritionix/nutritionix-ctrl.js')

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
          const newEntryData = DiaryEntries.build({
            user_id: req.body.userID,
            date: req.body.date,
            qty: req.body.qty,
            food: req.body.food
          });
          newEntryData
            .save()
            .then(() => {
              console.log('New diary entry data has been created.');
              res.status(201).send();
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
          id: req.body.id
        }
      })
      .then((affectedRows) => {
        res.status(201).send(affectedRows);
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  }
}

module.exports = diaryEntries;
