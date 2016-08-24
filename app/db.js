/* eslint-env node, es6 */
"use strict";

// Include external dependencies
var Sequelize = require('sequelize');

// Include local modules
var config = require('../config/config');

// Setup
var sequelize = new Sequelize(config.services.mysql.db, config.services.mysql.user, config.services.mysql.password, {
  host: config.services.mysql.host,
  dialect: 'mysql'
});

module.exports = sequelize;
