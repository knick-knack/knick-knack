'use strict';

var _        = require('lodash'),
    fs       = require('fs'),
    fsUtil   = require('./util/fs'),
    template = require('./template');

module.exports = generateProject;

function generateProject(tpl, context) {
  if (_.isString(tpl)) {
    tpl = template(tpl);
  }

  tpl.before();

  var tplPath = tpl.path,
      destPath = context.destination;

  fs.mkdirSync(destPath);
  _process(tplPath, destPath);

  tpl.after();
}

function _process(srcDir, destDir, depth) {
  fsUtil.list(srcDir).forEach(function (file) {
    var srcPath = srcDir + '/' + file,
        destPath = destDir + '/' + file;

    if (fsUtil.isDirectory(srcPath)) {
      fs.mkdirSync(destPath);
      _process(srcPath, destPath, (depth || 0) + 1);
    } else if (! _ignore(file, depth)) {
      fsUtil.copy(srcPath, destPath);
    }
  });
}

function _ignore(name, depth) {
  return (name === 'config.yml' || name === 'index.js') && ! depth;
}
