const ProfilePics = require('./profilePics-model.js');
//const cloudinary = require('cloudinary');

// const config = cloudinary.config({
//   cloud_name: 'tmlthesis',
//   api_key: '741352931342122',
//   api_secret: 'ntsm6j4hIIbdHlT6OPpBEmBsJi0'
// });
//


const profilePics = {


	// 'api/profilepics/upload' : {
	// 	cloudinary.v2.uploader.upload(req.files, function(result) {
	// 	  console.log(result);
	// 	});
	// }


	//PF pics in db
	'/api/profilepics/': {
		'get': (req, res) => {
			console.log('inside GET at /api/profilepics/');
			res.end('inside GET at /api/profilepics/');
		},
		'post': (req, res) => {
			console.log('inside POST at /api/profilepics/');
			res.end('inside POST at /api/profilepics/');
		},
		'put': (req, res) => {
			console.log('inside PUT at /api/profilepics/');
			res.end('inside PUT at /api/profilepics/');
		},
		'delete': (req, res) => {
			console.log('inside DELETE at /api/profilepics/');
			res.end('inside DELETE at /api/profilepics/');
		}
	}
}

module.exports = profilePics;
