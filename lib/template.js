'use strict';

var fs     = require('fs'),
    fsUtil = require('./util/fs'),
    yaml   = require('js-yaml'),
    _      = require('lodash');

var me = module.exports;

/**
 * Gather all template related information from a given template path.
 */
me.loadTemplate = function (tplPath) {
  var tpl = {};
}

/**
 * Checks if the given folder is a valid knick-knack project template
 */
me.isTemplate = function (folder) {
  return fsUtil.isFile(folder + '/config.yml') && me._isValidConfig(me._loadConfig(folder));
}

/**
 * Parses the config.yml file located in the path and return the content.
 */
me._readConfig = function (path) {
  var config = me._loadConfig(path);

  if (! config) { config = {}; }
  if (! config.variables) { config.variables = {}; }

  if (! me._isValidConfig(config)) {
    throw new Error('Config is invalid (maybe no description?)'); // TODO improve error message
  }

  return config;
}

me._loadConfig = function (path) {
  try {
    return yaml.safeLoad(fs.readFileSync(path + '/config.yml', 'utf8'));
  } catch (e) {
    throw new Error('Could not read config.yml in folder "' + path + '"');
  }
}

me._isValidConfig = function (config) {
  return _.isString(config.description);
}

function _readIndex(path) {
  var index;
  path += '/index.js';

  if (fsUtil.isFile(path)) {
    index = _.pick(require(require('path').resolve(path)), 'before', 'after');
  }

  return _.defaults(index || {}, { before: _noopWithCallback, after: _noopWithCallback });
}

function _noopWithCallback(template, done) { done(); }

me._extractVariables = function (file) {
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
me._extractVariablesFromFiles = function (templateFilesPath, noProcess) {
  if (noProcess) {
    noProcess = noProcess.map(function (pattern) {
      return pattern.replace(/\*/g, '');
    });
  }

  return _process(templateFilesPath);

  function _process(path, vars) {
    vars = vars || {};

    if (! me._shouldProcess(relpath(path), noProcess)) {
      return vars;
    }

    if (fs.lstatSync(path).isDirectory()) {
      var files = fs.readdirSync(path);

      files.forEach(function (file) {
        _process(path + '/' + file, vars); // recursion
      });
    } else if (! fsUtil.isBinary(path)) {
      var file = fs.readFileSync(path, 'utf8');
      _.extend(vars, me._extractVariables(file));
    }

    return vars;
  }

  function relpath(path) {
    return path.substr(templateFilesPath.length);
  }
}

me._shouldProcess = function (path, noProcess) {
  var should = true;
  if (noProcess) {
    should = ! noProcess.some(matches);
  }
  return should;

  function matches(pattern) {
    return _strcontains(path, pattern);
  }
}

function _strcontains(str, substr) {
  return str.indexOf(substr) !== -1;
}

/**
 * Go through all files in the given template and it's partials and gather all variables
 * to be filled out by the user.
 * @param  string baseFolder     The knick-knack folder
 * @param  string templatePath   The folder where the template lies
 * @return array                 A list of unique variables sorted by occurence
 */
me._getRequiredVariables = function (baseFolder, templatePath) {
  var config       = me._readConfig(templatePath),
      globalConfig = me._readConfig(baseFolder),
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
