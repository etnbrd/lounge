var path = require("path");
var os = require("os");
var fs = require("fs");

var Helper = {
	expandHome: expandHome,
	getConfig: getConfig,
	getUserConfigPath: getUserConfigPath,
	getUserLogsPath: getUserLogsPath,
	setHome: setHome,
	checkCerts: checkCerts
};

module.exports = Helper;

function setHome(homePath) {
	this.HOME = expandHome(homePath || "~/.lounge");
	this.CONFIG_PATH = path.join(this.HOME, "config.js");
	this.USERS_PATH = path.join(this.HOME, "users");
}

function getUserConfigPath(name) {
	return path.join(this.USERS_PATH, name + ".json");
}

function getUserLogsPath(name, network) {
	return path.join(this.HOME, "logs", name, network);
}

function getConfig() {
	return require(this.CONFIG_PATH);
}

function expandHome(shortenedPath) {
	var home;

	if (os.homedir) {
		home = os.homedir();
	}

	if (!home) {
		home = process.env.HOME || "";
	}

	home = home.replace("$", "$$$$");

	return path.resolve(shortenedPath.replace(/^~($|\/|\\)/, home + "$1"));
}

function checkCerts(trials, paths, cb, options) {
  if (trials === 0) {
    console.error('certificate not found');
    return;
  }

  var errs = {}
  var i = 2;

  fs.access(paths.key, fs.F_OK, check('key'));
  fs.access(paths.cert, fs.F_OK, check('cert'));

  function check(file){
    return function (err) {
      errs[file] = err

      if (--i === 0) {
        if (errs.key || errs.cert) {
          console.log('certificate not accesible yet, retrying in 15s');
          return setTimeout(verifyCert, 1500, trials - 1)
        } else {
          cb(options);
        }
      }
    }
  }
}