const auth = require('../config/auth.js');
const request = require('request');
const _ = require('underscore');

const appId = auth.nutritionixAuth.appId;
const appKey = auth.nutritionixAuth.appKey;

const Nutritionix = {
	'search': (input) => {
		const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
		const headers = {
			'Content-Type': 'application/json',
			'x-app-id': appId,
			'x-app-key': appKey
		}
		const options = {
			'query': input
		}
		return new Promise((resolve, reject) => {
			request.post({ url: url, form: options, headers: headers }, (err, res, body) => {
				if(err) {
					reject(err);
				} else {
					body = JSON.parse(body);
					const result = body.foods[0];
					const foodObj = {
						food: result.food_name,
						cal: result.nf_calories,
						carb: result.nf_total_carbohydrate,
						fat: result.nf_total_fat,
						protein: result.nf_protein,
						fiber: result.nf_dietary_fiber,
						n6: _.findWhere(result.full_nutrients, {"attr_id": 646}).value
					}
					resolve(foodObj);
				}
			});
		});
	}
}

module.exports = Nutritionix;
