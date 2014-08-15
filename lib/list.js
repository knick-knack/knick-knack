'use strict';

var glob = require('glob'),
    _    = require('lodash'),
    text = require('./util/text');

function listProjects(folder) {
  var results = [];
  
  var files = glob.sync('/projects/*', { root: folder });
  
  _.forEach(files, function(file) {
    var languageName = text.getMostNestedFolder(file);
    var templates = glob.sync('/*', {root: file });
    
    _.forEach(templates, function(template) {
      var templateName = text.getMostNestedFolder(template);
      results.push(languageName + '/' + templateName);
    });
  });
  
  return results;
}

exports.listProjects = listProjects;