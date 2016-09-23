const DiaryEntries = require('./diaryEntries-model.js');

const diaryEntries = {
	'/api/diaryEntries/createEntry': {
		'get': (req, res) => {
      var entryData = [];
			console.log('inside GET at /api/diaryEntries/createEntry');
      //find one , order by results
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
  }
}

module.exports = diaryEntries;
