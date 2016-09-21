const router = require('express').Router();
const nutritionix = require('../nutritionix/nutritionix-ctrl.js');
const users = require('../users/users-ctrl.js');
const questions = require('../questions/questions-ctrl.js');

//sample controller template
const dummy = require('../dummy/dummy-ctrl.js')

const controllers = [
	nutritionix,
	users,
	questions,
	dummy
]

for (var controller of controllers) {
	for (var route in controller) {
		if(controller[route].get) router.route(route).get(controller[route].get);
		if(controller[route].post) router.route(route).post(controller[route].post);
		if(controller[route].put) router.route(route).put(controller[route].put);
		if(controller[route].delete) router.route(route).delete(controller[route].delete);
	}
}

module.exports = router;
