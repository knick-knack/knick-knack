'use strict';

var fs   = require('fs'),
    glob = require('glob'),
    _    = require('lodash'),
    text = require('./util/text');

function listProjects(folder) {
  var results = [];
  
  var projectFolders = glob.sync('/projects/*', { root: folder });
  
  _.forEach(projectFolders, function(folder) {
    var languageName = text.getMostNestedFolder(folder);
    if(isValidProjectTemplate(folder)) {
      results.push(languageName);
    } else {
      var templates = glob.sync('/*', {root: folder });
      
      _.forEach(templates, function(template) {
        var templateName = text.getMostNestedFolder(template);
        results.push(languageName + '/' + templateName);
      });
    }
  });
  
  return results;
}

/**
 * Checks if the given folder is a valid knick-knack project template
 */
function isValidProjectTemplate(folder) {
  return fs.existsSync(folder + '/config.yml');
}

exports.listProjects = listProjects;