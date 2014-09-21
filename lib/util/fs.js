'use strict';

var fs = require('fs');

module.exports = {

  isFile: isFile,
  isBinary: require('isbinaryfile'),
  isDirectory: isDirectory,

  list: list,
  copy: copy,
  rmdir: require('rimraf').sync

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

function list(path) {
  return fs.readdirSync(path);
}

function copy(src, dest) {
  fs.writeFileSync(dest, fs.readFileSync(src));
}
