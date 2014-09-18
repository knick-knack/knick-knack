'use strict';

var fs = require('fs');

module.exports = {

  isFile: isFile,
  isBinary: require('isbinaryfile'),
  isDirectory: isDirectory

};

function isDirectory(path) {
  return (path = _stats(path)) && path.isDirectory();
}

function isFile(path) {
  return (path = _stats(path)) && path.isFile();
}

function _stats(path) {
  return fs.existsSync(path) && fs.statSync(path);
}
