const Nutritionix = require('./nutritionix-model.js');
const Storage = require('./nutritionixStorage-model.js');


const nutritionix = {

	//search cache before pinging API
	'search': (input) => {
		return new Promise((resolve, reject) => {
			Storage.findOne({
				where: {
					food: input
				}
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
							});
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
