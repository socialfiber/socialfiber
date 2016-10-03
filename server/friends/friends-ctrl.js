const Friends = require('./friends-model.js');
const Users = require('../users/users-model.js');

const friends = {
	'/api/friends/myFriends': {
		//browse friends
		'get': (req, res) => {
			console.log('inside GET at /api/friends/myFriends');
			Friends.findAll({
				where: {
					user1_id: req.query.userID
				}
			})
			.then((friends) => {
				res.status(200).json(friends);
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
						res.status(201).send({
							status: 'friends'
						});
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error updating friend request.'
						});
					});
				} else if(found && (found.status === 'requestor' || found.status === 'friends'))  {
					res.status(201).send(found);
				} else {
					Users.findById(req.body.otherID)
					.then((otherUser) => {
						Friends.create({
							user1_id: req.body.userID,
							user1_username: req.body.username,
							user2_id: req.body.otherID,
							user2_username: otherUser.username,
							status: 'requestor'
						})
						.then((requestor) => {
							Friends.create({
								user1_id: req.body.otherID,
								user1_username: otherUser.username,
								user2_id: req.body.userID,
								user2_username: req.body.username,
								status: 'requestee'
							})
							.then((requestee) => {
								res.status(201).send({
									status: 'requestor'
								});
							})
							.catch((err) => {
								res.status(400).send({
									msg: 'Error creating requestee.'
								});
							});
						})
						.catch((err) => {
							res.status(400).send({
								msg: 'Error creating requestor.'
							});
						});
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error finding friend to add.'
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
						where: {
							$or: [{
								user1_id: req.body.otherID,
								user2_id: req.body.userID
							}, {
								user1_id: req.body.userID,
								user2_id: req.body.otherID
							}]
						}
					})
					.then((accepted) => {
						res.status(201).send({
							status: 'friends'
						});
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error accepting friend request.'
						});
					});
				} else if(found && found.status === 'requestor') {
					res.status(201).send(found);
				} else {
					Users.findById(req.body.otherID)
					.then((otherUser) => {
						Friends.create({
							user1_id: req.body.userID,
							user1_username: req.body.username,
							user2_id: req.body.otherID,
							user2_username: otherUser.username,
							status: 'requestor'
						})
						.then((requestor) => {
							Friends.create({
								user1_id: req.body.otherID,
								user1_username: otherUser.username,
								user2_id: req.body.userID,
								user2_username: req.body.username,
								status: 'requestee'
							})
							.then((requestee) => {
								res.status(201).send({
									status: 'requestor'
								});
							})
							.catch((err) => {
								res.status(400).send({
									msg: 'Error creating requestee.'
								});
							});
						})
						.catch((err) => {
							res.status(400).send({
								msg: 'Error creating requestor.'
							});
						});
					})
					.catch((err) => {
						res.status(400).send({
							msg: 'Error finding friend to add.'
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
				where: {
					$or: [{
						user1_id: req.query.otherID,
						user2_id: req.query.userID
					}, {
						user1_id: req.query.userID,
						user2_id: req.query.otherID
					}]
				}
			})
			.then((affectedRows) => {
				res.status(201).send({
					status: null
				});
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
