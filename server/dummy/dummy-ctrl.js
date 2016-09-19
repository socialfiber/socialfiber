const Dummy = require('./dummy-model.js');

const dummy = {
	'/dummy_endpoint': {
		'get': (req, res) => {
			console.log('inside GET at /dummy_endpoint');
			res.end('inside GET at /dummy_endpoint');
		},
		'post': (req, res) => {
			console.log('inside POST at /dummy_endpoint');
			res.end('inside POST at /dummy_endpoint');
		},
		'put': (req, res) => {
			console.log('inside PUT at /dummy_endpoint');
			res.end('inside PUT at /dummy_endpoint');
		},
		'delete': (req, res) => {
			console.log('inside DELETE at /dummy_endpoint');
			res.end('inside DELETE at /dummy_endpoint');
		}
	}
}

module.exports = dummy;
