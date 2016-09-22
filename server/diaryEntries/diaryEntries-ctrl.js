const DiaryEntries = require('./diaryEntries-model.js');

const diaryEntries = {
	'/api/diaryEntries/createEntry': {
		'get': (req, res) => {
			console.log('inside GET at /dummy_endpoint');
			res.end('inside GET at /dummy_endpoint');
		},
		'post': (req, res) => {
			console.log('inside POST at /dummy_endpoint');
			res.end('inside POST at /dummy_endpoint');
		}
	}
}

module.exports = dummy;
