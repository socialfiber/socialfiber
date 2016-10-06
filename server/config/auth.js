const auth = {

    'nutritionix': {
        'appId': process.env.nutritionix_appId,
        'appKey': process.env.nutritionix_appKey
    },

    'jwt' : {
    	'secret': process.env.jwt_secret
    },

    'db' : {
    	'hostname': process.env.db_hostname,
    	'username': process.env.db_username,
    	'password': process.env.db_password
    }

}

module.exports = auth;
