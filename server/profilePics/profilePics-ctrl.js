const ProfilePics = require('./profilePics-model.js');

const profilePics = {

	'/api/profilePics/pic': {
		'get': (req, res) => {
			console.log('inside GET at /api/profilePics/');
			res.status(200).send();
		},
		'post': (req, res) => {
			ProfilePics.create({
				user_id: req.body.userID,
				url: req.body.url
			})
			.then(() => {
				res.status(201).send();
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		'put': (req, res) => {
			console.log('inside PUT at /api/profilePics/');
			res.end('inside PUT at /api/profilePics/');
		},
		'delete': (req, res) => {
			console.log('inside DELETE at /api/profilePics/');
			res.end('inside DELETE at /api/profilePics/');
		}
	}
}

module.exports = profilePics;
