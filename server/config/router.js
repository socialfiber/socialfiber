const router = require('express').Router();
const nutritionix = require('../nutritionix/nutritionix-ctrl.js');
const usersController = require('../users/users-ctrl.js');

for (var route in nutritionix) {
	router.route(route)
		// .get(nutritionix[route].get)
		.post(nutritionix[route].post)
		// .put(nutritionix[route].put)
		// .delete(nutritionix[route].delete);
}

for (var route in usersController) {
	router.route(route)
		.post(usersController[route].post)
}

// for (var route in controllers) {
// 	router.route(route)
// 		.get(controllers[route].get)
// 		.post(controllers[route].post)
// 		.put(controllers[route].put)
// 		.delete(controllers[route].delete);
// }

// for (var route in controllers) {
// 	router.route(route)
// 		.get(controllers[route].get)
// 		.post(controllers[route].post)
// 		.put(controllers[route].put)
// 		.delete(controllers[route].delete);
// }

module.exports = router;
