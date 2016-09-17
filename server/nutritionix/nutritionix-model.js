const auth = require('../config/auth.js');
const request = require('request');

const appId = auth.nutritionixAuth.appId;
const appKey = auth.nutritionixAuth.appKey;

const Nutritionix = {
	'search': (params) => {
		console.log('inside nutritionix-model search');
		const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
		const headers = {
			'X-APP-ID':appId,
			'X-APP-KEY':appKey
		}
		const options = {
			'query':params.query
		}
		return new Promise((resolve, reject) => {
			request.post({ url: url, form: options, headers: headers }, (err, res, body) => {
				if(err) {
					console.log('err inside nutritionix-model', err);
					reject(err);
				} else {
					resolve(body);
				}
			})
		})
	}
}

module.exports = Nutritionix;
