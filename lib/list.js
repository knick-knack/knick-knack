'use strict';

var fs    = require('fs');

exports.listTemplates = listTemplates;

/**
 * Searches the given directory for templates.
 *
 * @param {string} directory The path of a directory containing templates
 * @return {string[]} A list of templare names
 */
function listTemplates(directory) {
  var templates = [];

  fs.readdirSync(directory).forEach(function (file) {
    var path = directory + '/' + file;

    if (_isTemplate(path)) {
      templates.push(file);
    } else if (_isDirectory(path)) {
      // search group directory
      var group = file;

      fs.readdirSync(path).forEach(function (file) {
        if (_isTemplate(path + '/' + file)) {
          templates.push(group + '/' + file);
        }
      });
    }
  });

  return templates;
}

function _isTemplate(path) {
  return _isDirectory(path) && _isFile(path + '/config.yml');
}

function _isDirectory(path) {
  return (path = _stats(path)) && path.isDirectory();
}

function _isFile(path) {
  return (path = _stats(path)) && path.isFile();
}

function _stats(path) {
  return fs.existsSync(path) && fs.statSync(path);
}
