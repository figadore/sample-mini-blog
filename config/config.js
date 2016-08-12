/* eslint-env node */
/* eslint no-process-env: 0 */
var config = {};

config.appName = "blog";

config.env = process.env.NODE_ENV || "production";

config.port = process.env.NODE_PORT || 80;

config.logLevels = {};
if (config.env === "production") {
  config.logLevels.console = "info";
} else {
  config.logLevels.console = "debug";
}

config.services = {};

var mysqlConfig = {
  host: process.env.MYSQL_HOST,
  db: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS
};

if (empty(mysqlConfig.host) || empty(mysqlConfig.db) || empty(mysqlConfig.user) || empty(mysqlConfig.password)) {
  throw new Error("Missing required mysql config variable");
}

function empty(arg) {
  if (arg === undefined || arg === "" || arg === null) {
    return true;
  }
  return false;
}

config.services.mysql = mysqlConfig;

module.exports = config;
