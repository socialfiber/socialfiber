const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Posts = require('../posts/posts-model.js');


const Comments = sequelize.define('comments', {
  post_id: {
    type: Sequelize.INTEGER,
    unique: false
  },
  username: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Posts.hasMany(Comments, {foreignKey: 'post_id'});
Comments.belongsTo(Posts, {foreignKey: 'post_id'});

sequelize
  .sync()
  .then((err) => {
    console.log('Comments model synced successfully.');
  }, (err) => {
    console.log('An error has occurred:', err);
  });

module.exports = Comments;
