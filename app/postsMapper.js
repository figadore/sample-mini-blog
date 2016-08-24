/* eslint-env node */

// Include external modules
var Sequelize = require('sequelize');

// Include local modules
var db = require('./db');

exports = module.exports = db.define('posts', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  text: Sequelize.TEXT
});
