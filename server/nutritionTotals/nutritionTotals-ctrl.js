const NutritionTotals = require('./nutritionTotals-model.js');

const nutritionTotals = {
	'increase': (input) => {
		return new Promise((resolve, reject) => {
			NutritionTotals.findOrCreate({
				where: {
					user_id: input.user_id,
					date: input.date
				},
				attributes: ['cal', 'carb', 'fat','prot','fib','n6']
			})
			.then((entry) => {
				const start = entry[0].dataValues;
				NutritionTotals.update({
					cal: start.cal+input.cal,
					carb: start.carb+input.carb,
					fat: start.fat+input.fat,
					prot: start.prot+input.prot,
					fib: start.fib+input.fib,
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
			console.log("INPUT FOR DECREASE", input)
			NutritionTotals.findOne({
				where: {
					user_id: input.user_id,
					date: input.date
				},
				attributes: ['cal', 'carb', 'fat','prot','fib','n6']
			})
			.then((entry) => {
				const start = entry.dataValues;
				NutritionTotals.update({
					cal: start.cal-input.cal,
					carb: start.carb-input.carb,
					fat: start.fat-input.fat,
					prot: start.prot-input.prot,
					fib: start.fib-input.fib,
					n6: start.n6-input.n6
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
				});
			})
			.catch((err) => {
				reject(err);
			});
		});
	}
}

module.exports = nutritionTotals;