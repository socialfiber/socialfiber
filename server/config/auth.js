const auth = {

    'nutritionix': {
        'appId': process.env.nutritionix_appId,
        'appKey': process.env.nutritionix_appKey
    },

    'jwt' : {
        'secret': process.env.jwt_secret
    },

    'mysql' : {
        'hostname': process.env.db_hostname,
        'username': process.env.db_username,
        'password': process.env.db_password,
        'database': process.env.db_database
    },

    'imgur' : {
        'clientId': process.env.imgur_clientId,
        'clientSecret': process.env.imgur_clientSecret
    }

}

module.exports = auth;
