'use strict';

var fs     = require('fs'),
    fsUtil = require('./util/fs'),
    yaml   = require('js-yaml'),
    _      = require('lodash');

module.exports = exports = function template(path) {
  if (! isTemplate(path)) {
    throw new Error('"' + path + '" is not a template.');
  }

  return _.extend({}, readConfig(path), readIndex(path));
};

exports.isTemplate = isTemplate;
exports.readDescription = readDescription;
exports.readConfigFile = readConfig;
exports.getRequiredVariables = getRequiredVariables;
exports.extractVariablesFromFiles = extractVariablesFromFiles;
exports.extractVariables = extractVariables;
exports.shouldProcess = shouldProcess;

/**
 * Parses the config.yml file located in the path and return the content.
 */
function readConfig(path) {
  try {
    return yaml.safeLoad(fs.readFileSync(path + '/config.yml', 'utf8'));
  } catch (e) {
    throw new Error('Could not read config.yml in folder "' + path + '"');
  }
}

function readIndex(path) {
  var index;
  path += '/index.js';

  if (fsUtil.isFile(path)) {
    index = _.pick(require(path), 'before', 'after');
  }

  return _.defaults(index || {}, { before: _.noop, after: _.noop });
}

/**
 * Checks if the given folder is a valid knick-knack project template
 */
function isTemplate(folder) {
  return fsUtil.isFile(folder + '/config.yml') && _.isString(readDescription(folder));
}

/**
 * Parses the config.yml in a project folder and returns the description field.
 */
function readDescription(folder) {
  return readConfig(folder).description;
}

function extractVariables(file) {
  var variableRegex = /\{\{\s*(\S+)\s*\}\}/g,
      m,
      results = {};

  while ((m = variableRegex.exec(file)) !== null) {
    results[m[1]] = true;
  }
  return results;
}

/**
 * Searches through all files in the given folder except the ones who match one of the excludes
 * in noProcess.
 */
function extractVariablesFromFiles(templateFilesPath, noProcess) {
  if (noProcess) {
    noProcess = noProcess.map(function (pattern) {
      return pattern.replace(/\*/g, '');
    });
  }

  return _process(templateFilesPath);

  function _process(path, vars) {
    vars = vars || {};

    if (! shouldProcess(relpath(path), noProcess)) {
      return vars;
    }

    if (fs.lstatSync(path).isDirectory()) {
      var files = fs.readdirSync(path);

      files.forEach(function (file) {
        _process(path + '/' + file, vars); // recursion
      });
    } else if (! fsUtil.isBinary(path)) {
      var file = fs.readFileSync(path, 'utf8');
      _.extend(vars, extractVariables(file));
    }

    return vars;
  }

  function relpath(path) {
    return path.substr(templateFilesPath.length);
  }
}

function shouldProcess(path, noProcess) {
  var should = true;
  if (noProcess) {
    should = ! noProcess.some(matches);
  }
  return should;

  function matches(pattern) {
    return strcontains(path, pattern);
  }
}

function strcontains(str, substr) {
  return str.indexOf(substr) !== -1;
}

/**
 * Go through all files in the given template and it's partials and gather all variables
 * to be filled out by the user.
 * @param  string baseFolder     The knick-knack folder
 * @param  string templatePath   The folder where the template lies
 * @return array                 A list of unique variables sorted by occurence
 */
function getRequiredVariables(baseFolder, templatePath) {
  var config       = readConfig(templatePath),
      globalConfig = readConfig(baseFolder),
      variables;

  // - parse files and search for variables not yet present
  // - for every partial:
  //    - read variables of current template (importance: 2 - deeper nested template variables are less important)
  //       * in case of conflict:
  //    - parse files and search for variables not yet present
  // - read global config variables (importance: 3 - can be overwritten by any template variable declaration)

  //keep in mind that variables have an order as specified in the config files

  //read variables of current template (importance: 1 - never overwrite)
  variables = config.variables;
  return [];
}
