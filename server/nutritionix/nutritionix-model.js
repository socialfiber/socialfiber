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
					if(body.message) {
						resolve(body);
					} else {
						const result = body.foods[0];
						const foodObj = {
							food: input,
							api_name: result.food_name,
							cal: +(result.nf_calories).toFixed(4),
							carb: +(result.nf_total_carbohydrate).toFixed(4),
							fat: +(result.nf_total_fat).toFixed(4),
							prot: +(result.nf_protein).toFixed(4),
							fib: +(result.nf_dietary_fiber).toFixed(4),
							n6: +(_.findWhere(result.full_nutrients, {"attr_id": 646}).value).toFixed(4)
						}
						resolve(foodObj);
					}
				}
			});
		});
	}
}

module.exports = Nutritionix;
