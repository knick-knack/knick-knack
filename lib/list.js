'use strict';

var fs    = require('fs'),
    _     = require('underscore'),
    text  = require('./util/text'),
    templ = require('./template');

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
function listTemplates(folder) {
  var files = fs.readdirSync(folder),
      results = [];

  files.forEach(function (file) {
    var path = folder + '/' + file;

    if (templ.isValidProjectTemplate(path)) {
      results.push(file + ': ' + templ.readDescription(path));
    }
  });

  return results;
}

exports.listTemplates = listTemplates;
