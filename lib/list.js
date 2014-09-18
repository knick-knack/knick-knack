'use strict';

var fs     = require('fs'),
    fsUtil = require('./util/fs');

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
    } else if (fsUtil.isDirectory(path)) {
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
  return fsUtil.isDirectory(path) && fsUtil.isFile(path + '/config.yml');
}
