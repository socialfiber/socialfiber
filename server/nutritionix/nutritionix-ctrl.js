const Nutritionix = require('./nutritionix-model.js');
const Storage = require('./nutritionixStorage-model.js');

const nutritionix = {
	'/api/nutritionix/search': {
		'post': (req, res) => {
			Nutritionix.search(req.body.query)
			.then((data) => {
				res.status(200).send(data);
			}).catch((err) => {
				res.end('err inside nutritionix-ctrl.js', err);
			})
		}
	}
}

module.exports = nutritionix;
