const auth = {

    'nutritionixAuth': {
        'appId': process.env.nutritionix_appId,
        'appKey': process.env.nutritionix_appKey
    },

    'facebookAuth': {
        'clientID': process.env.facebook_clientID,
        'clientSecret': process.env.facebook_clientSecret,
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    }

}

module.exports = auth;
