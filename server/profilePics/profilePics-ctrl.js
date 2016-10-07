const ProfilePics = require('./profilePics-model.js');


const profilePics = {

	'/api/profilePics/pic': {
		'get': (req, res) => {
			ProfilePics.findOne({
				where: {
					user_id: req.query.userID,
					default: true
				}
			})
			.then((found) => {
				if(found) {
					res.status(200).send({
						url: found.url
					});
				} else {
					res.status(200).send({
						url: null
					});
				}
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		'post': (req, res) => {
			ProfilePics.update({
				default: false
			}, {
				where: {
					user_id: req.body.userID,
					default: true
				}
			})
			.then((updated) => {
				ProfilePics.create({
					user_id: req.body.userID,
					url: req.body.url,
					default: true
				})
				.then((newPic) => {
					res.status(201).send({
						msg: 'Image successfully added.'
					});
				})
				.catch((err) => {
					res.status(400).send();
				});
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		'put': (req, res) => {
			console.log('inside PUT at /api/profilePics/');
			ProfilePics.update({
				default: false
			}, {
				where: {
					user_id: req.body.userID,
					id: req.body.oldPicID
				}
			})
			.then((removed) => {
				ProfilePics.update({
					default: true
				}, {
					where: {
						user_id: req.body.userID,
						id: req.body.newPicID
					}
				})
				.then((updated) => {
					res.status(201).send();
				})
				.catch((err) => {
					res.status(400).send();
				});
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		'delete': (req, res) => {
			ProfilePics.delete({
				where: {
					id: req.body.picID
				}
			})
			.then((deleted) => {
				res.status(201).send();
			})
			.catch((err) => {
				res.status(400).send();
			});
		}
	}
	
}

module.exports = profilePics;
