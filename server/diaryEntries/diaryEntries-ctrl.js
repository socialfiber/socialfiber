const DiaryEntries = require('./diaryEntries-model.js');

const diaryEntries = {
	'/api/diaryEntries/getEntry': {
		'get': (req, res) => {
      var entryData = [];
			console.log('inside GET at /api/diaryEntries/getEntry');
      //find first result by date
      const getDiaryEntry = DiaryEntries.findAll({
        limit: 1,
        where: {
          user_id: req.query.userID
        }
        order: [
          ['date', 'DESC']
        ]
      })
      .then( (entries) => {
        entries.forEach( (entry) => {
          console.log('entry : ', entry);
          entryData.push(entry);
        });
        console.log('sending data');
        console.log('entryData: ', entryData);
        res.json(userData);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.status(400).send(err.message);
      });
		}
  },
  '/api/diaryEntries/createEntry': {
    'post': (req, res) => {
      const newEntryData = DiaryEntries.build({
        diary_id: req.body.diary_id,
        user_id: req.body.user_id,
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
