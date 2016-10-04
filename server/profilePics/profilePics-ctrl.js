const ProfilePics = require('./profilePics-model.js');

const profilePics = {
	'/api/profilepics/': {
		'get': (req, res) => {
			console.log('inside GET at /api/profilepics/');
			res.end('inside GET at /api/profilepics/');
		},
		'post': (req, res) => {
			console.log('inside POST at /api/profilepics/');
			res.end('inside POST at /api/profilepics/');
		},
		'put': (req, res) => {
			console.log('inside PUT at /api/profilepics/');
			res.end('inside PUT at /api/profilepics/');
		},
		'delete': (req, res) => {
			console.log('inside DELETE at /api/profilepics/');
			res.end('inside DELETE at /api/profilepics/');
		}
	}
}

module.exports = profilePics;
