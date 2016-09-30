const Nutritionix = require('./nutritionix-model.js');
const Storage = require('./nutritionixStorage-model.js');

const nutritionix = {
	'search': (input) => {
		return new Promise((resolve, reject) => {
			Storage.findOne({
				where: {
					food: input
				},
				attributes: ['food', 'api_name', 'cal', 'carb', 'fat','prot','fib','n6']
			})
			.then((entry) => {
				if(entry!==null) {
					resolve(entry);
				} else {
					Nutritionix.search(input)
					.then((data) => {
						if(data.message) {
							resolve(data);
						} else {
							Storage.create(data)
							.then((stored) => {
								resolve(stored);
							})
							.catch((err) => {
								reject(err);
							})
						}
					})
					.catch((err) => {
						reject(err);
					});
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	}
}

module.exports = nutritionix;
