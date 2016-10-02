const Friends = require('./friend-model.js');

const friends = {
	'/api/friends/myFriends': {
		//browse friends
		'get': (req, res) => {
			console.log('inside GET at /api/friends/myFriends');
			Friends.findAll({
				where: {
					user1_id: req.query.userID
				},
				attributes: ['user1_id', 'user2_id', 'status']
			})
			.then((friends) => {
				// if(friends) {
					res.status(200).json(friends);
				// } else {
				// 	res.status(200).json([])
				// }
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Error fetching friends.'
				});
			})
		}
	},
	'/api/friends/friendshipStatus': {
		//get friendship status
		'get': (req, res) => {
			console.log('inside GET at /api/friends/friendshipStatus');
			Friends.findOne({
				where: {
					user1_id: req.query.userID,
					user2_id: req.query.otherID
				},
				attributes: ['status']
			})
			.then((found) => {
				//could be friend or requestor
				if(found !== null) {
					res.status(200).send(found);
				} else {
					res.status(200).send({
						status: null
					});
				}
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Error fetching friendship status.'
				});
			});
		},
		//send friend request
		'post': (req, res) => {
			console.log('inside POST at /api/friends/friendshipStatus');
			Friends.findOne({
				where: {
					user1_id: req.body.userID,
					user2_id: req.body.otherID
				},
				attributes: ['status']
			})
			.then((found) => {
				console.log("FRIENDS FINDONE", found)
				if(found && found.status === 'requestee') {
					Friends.update({
						status: 'friends'
					}, {
						where: $or[{
							user1_id: req.body.otherID,
							user2_id: req.body.userID
						}, {
							user1_id: req.body.userID,
							user2_id: req.body.otherID
						}]
					})
					.then((accepted) => {
						res.status(201).send();
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error updating friend request.'
						});
					});
				} else if(found && (found.status === 'requestor' || found.status === 'friends'))  {
					res.status(201).send();
				} else {
					Friends.create({
						user1_id: req.body.userID,
						user2_id: req.body.otherID,
						status: 'requestor'
					})
					.then((requested) => {
						Friends.create({
							user1_id: req.body.otherID,
							user2_id: req.body.userID,
							status: 'requestee'
						}).then((requestee) => {
							res.status(201).send();
						})
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error sending friend request.'
						});
					});
				}
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Error checking friend request.'
				});
			});
			
		},
		//accept friend request
		'put': (req, res) => {
			console.log('inside POST at /api/friends/friendshipStatus');
			Friends.findOne({
				where: {
					user1_id: req.body.userID,
					user2_id: req.body.otherID
				},
				attributes: ['status']
			})
			.then((found) => {
				if(found && (found.status === 'requestee' || found.status === 'friends')) {
					Friends.update({
						status: 'friends'
					}, {
						where: $or[{
							user1_id: req.body.otherID,
							user2_id: req.body.userID
						}, {
							user1_id: req.body.userID,
							user2_id: req.body.otherID
						}]
					})
					.then((accepted) => {
						res.status(201).send();
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error accepting friend request.'
						});
					});
				} else if(found && found.status === 'requestor') {
					res.status(201).send();
				} else {
					Friends.create({
						user1_id: req.body.userID,
						user2_id: req.body.otherID,
						status: 'requestor'
					})
					.then((requested) => {
						Friends.create({
							user1_id: req.body.otherID,
							user2_id: req.body.userID,
							status: 'requestee'
						}).then((requestee) => {
							res.status(201).send();
						})
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error sending friend request.'
						});
					});
				}
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Error checking friend request.'
				});
			});
		},
		//delete friend and friendship request
		'delete': (req, res) => {
			console.log('inside DELETE at /api/friends/friendshipStatus');
			Friends.destroy({
				where: $or[{
					user1_id: req.query.otherID,
					user2_id: req.query.userID
				}, {
					user1_id: req.query.userID,
					user2_id: req.query.otherID
				}]
			})
			.then((affectedRows) => {
				res.status(201).send();
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Error deleting friendship.'
				});
			});
		}
	}
}

module.exports = friends;
