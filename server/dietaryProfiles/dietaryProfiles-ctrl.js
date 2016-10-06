const DietaryProfiles = require('./dietaryProfiles-model.js');
const profiles = require('./profiles.js');

const profilesArr = [];
for(var type in profiles) {
  profilesArr.push(profiles[type]);
}


const dietaryProfiles = {

  //creates all dietary profiles
  '/api/dietaryProfile/makeProfiles': {
    'post': (req, res) => {
      console.log('inside POST at /api/dietaryProfile/makeProfiles');
      DietaryProfiles.bulkCreate(profilesArr)
      .then((created) => {
        res.status(201).send({
          msg: 'Dietary profiles successfully created.'
        });
      })
      .catch((err) => {
        res.status(400).send();
      });
    }
  }

}

module.exports = dietaryProfiles;
