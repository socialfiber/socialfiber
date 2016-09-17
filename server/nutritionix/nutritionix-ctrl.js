const Nutritionix = require('./nutritionix-model.js');

const nutritionix = {
	'/api/nutritionix/search': {
		// 'get': (req, res) => {
		// 	console.log('inside GET at /api/nutritionix/search');
		// 	Nutritionix.something()
		// 	.then((data) => {
		// 		res.send(data);
		// 	}).catch((err) => {
		// 		console.log('err inside nutritionix-ctrl', err);
		// 		res.end('err inside nutritionix-ctrl', err);
		// 	})
		// },
		'post': (req, res) => {
			console.log('inside nutritionix-ctrl post');
			Nutritionix.search(req.body)
			.then((dishes) => {
				res.status(200).json(dishes);
			}).catch((err) => {
				console.log('err inside nutritionix-ctrl', err);
				res.end('err inside nutritionix-ctrl', err);
			})
		}
		// 'put': (req, res) => {
		// 	console.log('inside PUT at /api/nutritionix/search');
		// 	Nutritionix.something()
		// 	.then((data) => {
		// 		res.send(data);
		// 	}).catch((err) => {
		// 		console.log('err inside nutritionix-ctrl', err);
		// 		res.end('err inside nutritionix-ctrl', err);
		// 	})
		// },
		// 'delete': (req, res) => {
		// 	console.log('inside DELETE at /api/nutritionix/search');
		// 	Nutritionix.something()
		// 	.then((data) => {
		// 		res.send(data);
		// 	}).catch((err) => {
		// 		console.log('err inside nutritionix-ctrl', err);
		// 		res.end('err inside nutritionix-ctrl', err);
		// 	})
		// }
	}
}

module.exports = nutritionix;
