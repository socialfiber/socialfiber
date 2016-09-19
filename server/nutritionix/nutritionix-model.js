const auth = require('../config/auth.js');
const request = require('request');

const appId = auth.nutritionixAuth.appId;
const appKey = auth.nutritionixAuth.appKey;

const Nutritionix = {
	'search': (params) => {
		const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
		const headers = {
			'Content-Type': 'application/json',
			'x-app-id': appId,
			'x-app-key': appKey
		}
		const options = {
			'query': params.query
		}
		return new Promise((resolve, reject) => {
			request.post({ url: url, form: options, headers: headers }, (err, res, body) => {
				if(err) {
					reject(err);
				} else {
					resolve(JSON.parse(body));
				}
			});
		});
	}
}

module.exports = Nutritionix;
