const Friends = require('./friend-model.js');

const friends = {
	'/api/friends/myFriends': {
		//browse friends
		'get': (req, res) => {
			console.log('inside GET at /myFriends');
			res.end('inside GET at /myFriends');
		}
	},
	'/api/friends/friendshipStatus': {
		//get friendship status
		'get': (req, res) => {
			console.log('inside GET at /friendshipStatus');
			res.end('inside GET at /friendshipStatus');
		},
		//send friend request
		'post': (req, res) => {
			console.log('inside POST at /friendshipStatus');
			res.end('inside POST at /friendshipStatus');
		},
		//accept or ignore friend request
		'put': (req, res) => {
			console.log('inside PUT at /friendshipStatus');
			res.end('inside PUT at /friendshipStatus');
		},
		//delete friend and friendship request
		'delete': (req, res) => {
			console.log('inside DELETE at /friendshipStatus');
			res.end('inside DELETE at /friendshipStatus');
		}
	}
}

module.exports = friends;
