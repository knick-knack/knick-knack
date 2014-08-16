'use strict';

var fs = require('fs');

/**
 * Checks if the given folder is a valid knick-knack project template
 */
function isValidProjectTemplate(folder) {
  return fs.existsSync(folder + '/config.yml');
}

exports.isValidProjectTemplate = isValidProjectTemplate;