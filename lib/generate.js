'use strict';

var fs       = require('fs'),
    template = require('./template');

/**
 * Generates a project based on the given template.
 *
 * @param {String} templatesDirectory The path of the directory containing the template
 * @param {String} templateName The name of the template to instantiate
 */
function generateProject(templatesDirectory, templateName) {
  var path = templatesDirectory + '/' + templateName;

  if (! template.isTemplate(path)) {
    throw new Error('The given template is not valid. Check the path: "' + path + '"');
  }
}

exports.generateProject = generateProject;
