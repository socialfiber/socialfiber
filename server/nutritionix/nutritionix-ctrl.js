const Nutritionix = require('./nutritionix-model.js');

const nutritionix = {
	'/api/nutritionix/search': {
		'get': (req, res) => {
			console.log('inside GET at /api/nutritionix/search');
			res.end('inside GET at /api/nutritionix/search');
		},
		'post': (req, res) => {
			Nutritionix.search(req.body)
			.then((data) => {
				res.status(200).send(data);
			}).catch((err) => {
				res.end('err inside nutritionix-ctrl.js', err);
			})
		},
		'put': (req, res) => {
			console.log('inside PUT at /api/nutritionix/search');
			res.end('inside PUT at /api/nutritionix/search');
		},
		'delete': (req, res) => {
			console.log('inside DELETE at /api/nutritionix/search');
			res.end('inside DELETE at /api/nutritionix/search');
		}
	}
}

module.exports = nutritionix;
