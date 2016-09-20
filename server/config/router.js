const router = require('express').Router();
const nutritionix = require('../nutritionix/nutritionix-ctrl.js');
const usersController = require('../users/users-ctrl.js');
const questionsController = require('../questions/questions-ctrl.js');

//sample controller template
const dummy = require('../dummy/dummy-ctrl.js')

for (var route in nutritionix) {
	router.route(route)
		.get(nutritionix[route].get)
		.post(nutritionix[route].post)
		.put(nutritionix[route].put)
		.delete(nutritionix[route].delete);
}

for (var route in usersController) {
	router.route(route)
		.post(usersController[route].post)
		.get(usersController[route].get)
}

for (var route in questionsController) {
	router.route(route)
		.post(questionsController[route].post)
		.get(questionsController[route].get)
}

// for (var route in controllers) {
// 	router.route(route)
// 		.get(controllers[route].get)
// 		.post(controllers[route].post)
// 		.put(controllers[route].put)
// 		.delete(controllers[route].delete);
// }

//sample routing template
for (var route in dummy) {
	router.route(route)
		.get(dummy[route].get)
		.post(dummy[route].post)
		.put(dummy[route].put)
		.delete(dummy[route].delete);
}

module.exports = router;
