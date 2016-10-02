const router = require('express').Router();
const users = require('../users/users-ctrl.js');
const questions = require('../questions/questions-ctrl.js');
const diaryEntries = require('../diaryEntries/diaryEntries-ctrl.js');
const groups = require('../groups/groups-ctrl.js');
const groups_users = require('../groups_users/groups_users-ctrl.js');
const dietaryProfiles = require('../dietaryProfiles/dietaryProfiles-ctrl.js');
const posts = require('../posts/posts-ctrl.js');
const friends = require('../friends/friends-ctrl.js');

//sample controller template
const dummy = require('../dummy/dummy-ctrl.js')
const middleware = require('./middleware.js');

const controllers = [
	users,
	questions,
	diaryEntries,
	dummy,
	groups,
	groups_users,
	dietaryProfiles,
	posts,
	friends
]

for (var controller of controllers) {
	for (var route in controller) {
		if(controller[route].get) router.get(route, middleware.auth, controller[route].get);
		if(controller[route].post) router.post(route, middleware.auth, controller[route].post);
		if(controller[route].put) router.put(route, middleware.auth, controller[route].put);
		if(controller[route].delete) router.delete(route, middleware.auth, controller[route].delete);
	}
}

module.exports = router;
