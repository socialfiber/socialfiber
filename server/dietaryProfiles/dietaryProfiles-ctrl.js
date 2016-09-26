const DietaryProfiles = require('./dietaryProfiles-model.js');
const profiles = require('./profiles.js');

const profilesArr = [];
for(var type in profiles) {profilesArr.push(profiles[type])}

const dietaryProfiles = {
  '/api/dietaryProfile/makeProfiles': {
    'post': (req, res) => {
      console.log('inside POST at /api/dietaryProfile/makeProfiles');
      profilesArr.forEach((type) => {
        const newDietaryProfile = DietaryProfiles.build(type);
        newDietaryProfile
          .save()
          .then(() => {
            console.log('New dietary profile has been created.');
          });
      })
      res.status(201).send();
    }
  }
}

module.exports = dietaryProfiles;
