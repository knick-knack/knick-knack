'use strict';

var fs    = require('fs'),
    glob  = require('glob'),
    _     = require('underscore'),
    text  = require('./util/text'),
    templ = require('./util/template');

/**
 * Looks at the given folder and returns all valid project templates.
 * The following are valid templates:
 * 
 * folder/projects/myProject
 * |s
 * -- config.yml
 * 
 * folder/projects/java/myProject
 * |
 * -- config.yml
 * 
 * @param   folder (string) an absolute or relative file path to a folder containing project templates
 * @returns [string]        a list of template names
 */
function listProjects(folder) {
  var results = [];
  
  var projectFolders = glob.sync('/projects/*', { root: folder });
  
  _.forEach(projectFolders, function(folder) {
    var languageName = text.getMostNestedFolder(folder);
    if (templ.isValidProjectTemplate(folder)) {
      var desc = templ.readDescription(folder);
      results.push(languageName + ': ' + desc);
    } else {
      var templates = glob.sync('/*', {root: folder });
      
      _.forEach(templates, function(template) {
        var templateName = text.getMostNestedFolder(template);
        if (templ.isValidProjectTemplate(template)) {
          var templateId = languageName + '/' + templateName,
              desc = templ.readDescription(template);
          results.push(templateId + ': ' + desc);
        }
      });
    }
  });
  
  return results;
}

exports.listProjects = listProjects;