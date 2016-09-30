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
					cal: +(start.cal+input.cal).toFixed(4),
					carb: +(start.carb+input.carb).toFixed(4),
					fat: +(start.fat+input.fat).toFixed(4),
					prot: +(start.prot+input.prot).toFixed(4),
					fib: +(start.fib+input.fib).toFixed(4),
					n6: +(start.n6+input.n6).toFixed(4)
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
					user_id: input.user_id,
					date: input.date
				},
				attributes: ['cal', 'carb', 'fat','prot','fib','n6']
			})
			.then((entry) => {
				const start = entry.dataValues;
				NutritionTotals.update({
					cal: Math.max(+(start.cal-input.cal).toFixed(4), 0),
					carb: Math.max(+(start.carb-input.carb).toFixed(4), 0),
					fat: Math.max(+(start.fat-input.fat).toFixed(4), 0),
					prot: Math.max(+(start.prot-input.prot).toFixed(4), 0),
					fib: Math.max(+(start.fib-input.fib).toFixed(4), 0),
					n6: Math.max(+(start.n6-input.n6).toFixed(4), 0)
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
