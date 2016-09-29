const NutritionTotals = require('./nutritionTotals-model.js');

const nutritionTotals = {
	'increase': (input) => {
		return new Promise((resolve, reject) => {
			NutritionTotals.findOrCreate({
				where: {
					user_id: input.user_id,
					date: input.date
				},
				attributes: ['cal', 'carb', 'fat','protein','fiber','n6']
			})
			.then((entry) => {
				const start = entry[0].dataValues;
				console.log("UPDATING AFTER CREATE", start)
				NutritionTotals.update({
					cal: start.cal+input.cal,
					carb: start.carb+input.carb,
					fat: start.fat+input.fat,
					protein: start.protein+input.protein,
					fiber: start.fiber+input.fiber,
					n6: start.n6+input.n6
				}, {
					where: {
						user_id: input.user_id,
						date: input.date
					}
				})
				.then((updated) => {
					resolve(updated);
				})
				.catch((err) => {
					reject(err);
				})
			})
			.catch((err) => {
				reject(err);
			});
		});
	},
	'decrease': (input) => {
		return new Promise((resolve, reject) => {
			NutritionTotals.findOne({
				where: {
					user_id: input.userID,
					date: input.date
				},
				attributes: ['cal', 'carb', 'fat','protein','fiber','n6']
			})
			.then((entry) => {
				const start = entry[0].dataValues;
				NutritionTotals.update({
					cal: start.cal-input.cal,
					carb: start.carb-input.carb,
					fat: start.fat-input.fat,
					protein: start.protein-input.protein,
					fiber: start.fiber-input.fiber,
					n6: start.n6-input.n6
				}, {
					where: {
						user_id: input.userID,
						date: input.date
					}
				})
				.then((updated) => {
					resolve(updated);
				})
				.catch((err) => {
					reject(err);
				})
			})
			.catch((err) => {
				reject(err);
			});
		});
	}
}

module.exports = nutritionTotals;