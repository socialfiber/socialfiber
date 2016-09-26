const DietaryProfiles = require('./dietaryProfiles-model.js');
const profiles = require('./profiles.js');

const dietaryProfiles = {
  '/api/dietaryProfile/makeProfiles': {
    'post': (req, res) => {
      console.log('inside POST at /api/dietaryProfile/makeProfiles');
      profiles.forEach((type) => {
        const newDietaryProfile = DietaryProfiles.build(profiles[type]);
        newDietaryProfile
          .save()
          .then(() => {
            console.log('New dietary profile has been created.');
          });
      })
    }
  }
}

module.exports = dietaryProfiles;
