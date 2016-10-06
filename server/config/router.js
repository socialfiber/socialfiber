const router = require('express').Router();
const users = require('../users/users-ctrl.js');
const questions = require('../questions/questions-ctrl.js');
const profilePics = require('../profilePics/profilePics-ctrl.js');
const diaryEntries = require('../diaryEntries/diaryEntries-ctrl.js');
const dietaryProfiles = require('../dietaryProfiles/dietaryProfiles-ctrl.js');
const friends = require('../friends/friends-ctrl.js');
const groups = require('../groups/groups-ctrl.js');
const posts = require('../posts/posts-ctrl.js');
const comments = require('../comments/comments-ctrl.js');
const chatrooms = require('../chat/chatrooms-ctrl.js');

//sample controller template
const dummy = require('../dummy/dummy-ctrl.js');

//apply middleware to routes
const middleware = require('./middleware.js');

//list of all routed controllers
const controllers = [
	dummy,
	users,
	questions,
	profilePics,
	diaryEntries,
	dietaryProfiles,
	friends,
	groups,
	posts,
	comments,
	chatrooms
];

//routes to all controllers
for (var controller of controllers) {
	for (var route in controller) {
		if(controller[route].get) router.get(route, middleware.auth, controller[route].get);
		if(controller[route].post) router.post(route, middleware.auth, controller[route].post);
		if(controller[route].put) router.put(route, middleware.auth, controller[route].put);
		if(controller[route].delete) router.delete(route, middleware.auth, controller[route].delete);
	}
}

module.exports = router;
