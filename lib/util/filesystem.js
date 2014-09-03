'use strict';

var fs = require('fs');

var folderExists = function(name) {
  return fs.existsSync(name) && fs.statSync(name).isDirectory();
}

exports.folderExists = folderExists;