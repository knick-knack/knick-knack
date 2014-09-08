'use strict';

var fs   = require('fs'),
    yaml = require('js-yaml');

/**
 * Parses the config.yml file located in the path and return the content.
 */
function readConfigFile(path) {
  try {
    return yaml.safeLoad(fs.readFileSync(path + '/config.yml', 'utf8'));
  } catch (e) {
    throw new Error('Could not read config.yml in folder "' + path + '"');
  }
}

/**
 * Checks if the given folder is a valid knick-knack project template
 */
function isValidProjectTemplate(folder) {
  return fs.existsSync(folder + '/config.yml');
}

/**
 * Parses the config.yml in a project folder and returns the description field.
 */
function readDescription(folder) {
  return readConfigFile(folder).description;
}

function getRequiredVariables(path) {
  console.log('TODO');
  return [];
}

exports.isValidProjectTemplate = isValidProjectTemplate;
exports.readDescription = readDescription;
exports.readConfigFile = readConfigFile;
exports.getRequiredVariables = getRequiredVariables;
