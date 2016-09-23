const DiaryEntries = require('./diaryEntries-model.js');

const diaryEntries = {
	'/api/diaryEntries/getAllEntries': {
		'get': (req, res) => {
      var entryData = [];
			console.log('inside GET at /api/diaryEntries/getAllEntries');
      //find first result by date
      const getDiaryEntry = DiaryEntries.findAll({
        where: {
          user_id: req.query.userID
        }
        order: [
          ['date', 'DESC']
        ]
      })
      .then((entries) => {
        console.log("JOURNAL ENTRIES!!!!!", entries);
        entries.forEach( (entry) => {
          entryData.push(entry);
        });
        res.json(entryData);
      })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  '/api/diaryEntries/createEntry': {
    'post': (req, res) => {
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
          res.sendStatus(201);
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

module.exports = diaryEntries;
