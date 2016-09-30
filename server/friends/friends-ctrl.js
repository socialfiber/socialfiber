const Friends = require('./friend-model.js');

const friends = {
	'/api/friends/myFriends': {
		//browse friends
		'get': (req, res) => {
			Friends.findAll({
				where: {
					user1_id: req.body.userID
				},
				attributes: ['user1_id', 'user2_id', 'status']
			})
			.then((friends) => {
				res.status(201).send(friends);
			})
			.catch((err) => {
				res.status(400).send();
			})
		}
	},
	'/api/friends/friendshipStatus': {
		//get friendship status
		'get': (req, res) => {
			console.log('inside GET at /friendshipStatus');
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
					//check if requested
					Friends.findOne({
						where: {
							user1_id: req.query.otherID,
							user2_id: req.query.userID
						},
						attributes: ['status']
					})
					.then((requestee) => {
						res.status(200).send(requestee);
					})
					.catch((err) => {
						res.status(400).send();
					});
				}
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		//send friend request
		'post': (req, res) => {
			console.log('inside POST at /friendshipStatus');
			Friends.create({
				user1_id: req.body.userID,
				user2_id: req.body.otherID,
				status: 'requested'
			})
			.then((requested) => {
				res.status(201).send();
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		//accept or ignore friend request
		'put': (req, res) => {
			console.log('inside PUT at /friendshipStatus');
			Friends.update({
				status: 'accepted'
			}, { where:
				user1_id: req.body.otherID ,
				user2_id: req.body.userID
			})
			.then((accepted) => {
				Friends.findOrCreate({
					where: {
						user1_id: req.body.userID,
						user2_id: req.body.otherID
					}
				})
				.then((friendship) => {
					friendship.update({ status: 'accepted' })
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
			})
			.catch((err) => {
				res.status(400).send();
			});
		},
		//delete friend and friendship request
		'delete': (req, res) => {
			console.log('inside DELETE at /friendshipStatus');
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
				res.status(400).send();
			});
		}
	}
}

module.exports = friends;
