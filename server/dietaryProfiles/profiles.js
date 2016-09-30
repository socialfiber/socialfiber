const profiles = {};
const fields = {
	carb: {
		child: [130,130],
		male: [130,130,130,130,130],
		female: [130,130,130,130,130],
		preg:[175],
		lact:[210]
	},
	carb_min: {
		child: [0.45,0.45],
		male: [0.45,0.45,0.45,0.45,0.45],
		female: [0.45,0.45,0.45,0.45,0.45],
		preg:[0.45],
		lact:[0.45]
	},
	carb_max: {
		child: [0.65,0.65],
		male: [0.65,0.65,0.65,0.65,0.65],
		female: [0.65,0.65,0.65,0.65,0.65],
		preg:[0.65],
		lact:[0.65]
	},
	fat_min: {
		child: [0.30,0.25],
		male: [0.25,0.25,0.20,0.20,0.20],
		female: [0.25,0.25,0.20,0.20,0.20],
		preg:[0.20],
		lact:[0.20]
	},
	fat_max: {
		child: [0.40,0.35],
		male: [0.35,0.35,0.35,0.35,0.35],
		female: [0.35,0.35,0.35,0.35,0.35],
		preg:[0.35],
		lact:[0.35]
	},
	prot: {
		child: [13,19],
		male: [34,52,56,56,56],
		female: [34,46,46,46,46],
		preg:[71],
		lact:[71]
	},
	prot_min: {
		child: [0.05,0.10],
		male: [0.10,0.10,0.10,0.10,0.10],
		female: [0.10,0.10,0.10,0.10,0.10],
		preg:[0.10],
		lact:[0.10]
	},
	prot_max: {
		child: [0.20,0.30],
		male: [0.30,0.30,0.35,0.35,0.35],
		female: [0.30,0.30,0.35,0.35,0.35],
		preg:[0.35],
		lact:[0.35]
	},
	fib: {
		child: [19,25],
		male: [31,38,38,38,30],
		female: [26,26,25,25,21],
		preg:[28],
		lact:[29]
	},
	n6: {
		child: [7,10],
		male: [12,16,17,17,14],
		female: [10,11,12,12,11],
		preg:[13],
		lact:[13]
	},
	n6_min: {
		child: [0.05,0.05],
		male: [0.05,0.05,0.05,0.05,0.05],
		female: [0.05,0.05,0.05,0.05,0.05],
		preg:[0.05],
		lact:[0.05]
	},
	n6_max: {
		child: [0.10,0.10],
		male: [0.10,0.10,0.10,0.10,0.10],
		female: [0.10,0.10,0.10,0.10,0.10],
		preg:[0.10],
		lact:[0.10]
	},
	n3: {
		child: [0.7,0.9],
		male: [1.2,1.6,1.6,1.6,1.6],
		female: [1.0,1.1,1.1,1.1,1.1],
		preg:[1.4],
		lact:[1.3]
	},
	n3_min: {
		child: [0.006,0.006],
		male: [0.006,0.006,0.006,0.006,0.006],
		female: [0.006,0.006,0.006,0.006,0.006],
		preg:[0.006],
		lact:[0.006]
	},
	n3_max: {
		child: [0.012,0.012],
		male: [0.012,0.012,0.012,0.012,0.012],
		female: [0.012,0.012,0.012,0.012,0.012],
		preg:[0.012],
		lact:[0.012]
	}
}

for(var field in fields) {
	for(var opt in fields[field]) {
		for(var i=0; i<fields[field][opt].length; i++) {
			var code = opt+i;
			profiles[code] = profiles[code] || {};
			profiles[code][field] = fields[field][opt][i];
		}
	}
}

//adds code string and estimates fat
for(var code in profiles) {
	profiles[code].code = code;
	profiles[code].fat = Math.round((profiles[code].fat_min/(1-profiles[code].fat_min)+profiles[code].fat_max/(1-profiles[code].fat_max))/2*(profiles[code].carb+profiles[code].prot+profiles[code].n6+profiles[code].n3));
}

//check all properties are there
// const flag = true;
// const specs = [
// 	'carb',
// 	'carb_min', 
// 	'carb_max', 
// 	'fat',
// 	'fat_min', 
// 	'fat_max', 
// 	'prot', 
// 	'prot_min',
// 	'prot_max',
// 	'fib', 
// 	'n6', 
// 	'n6_min', 
// 	'n6_max', 
// 	'n3', 
// 	'n3_min', 
// 	'n3_max'
// ];
// for(var code in profiles) {
// 	specs.forEach((spec) => {
// 		if(!profiles[code][spec]) {
// 			flag = false;
// 		}
// 	})
// }

module.exports = profiles;
