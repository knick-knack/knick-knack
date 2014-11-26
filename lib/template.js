'use strict';

var fs     = require('fs'),
    fsUtil = require('./util/fs'),
    _      = require('lodash');

exportFuncs(
  loadTemplate,
  isTemplate
);

if (process.env.NODE_ENV === 'test') {
  exportFuncs(
    _isValidConfig,
    _getConfigPath,
    _loadTemplateHooks,
    _extractVariablesFromFiles,
    _extractVariables
  );
}

console.log(module.exports);

/**
 * Gather all template related information from a given template path.
 */
function loadTemplate(tplPath) {
  if(isTemplate(tplPath)) {
    var tpl = {},
        tplFilesPath = tplPath + '/files';

    tpl.config = fsUtil.readYaml(_getConfigPath(tplPath));

    if (fsUtil.isDirectory(tplFilesPath)) {
      tpl.files = tplFilesPath;
    }

    _.extend(tpl, _loadTemplateHooks(tplPath + '/process.js'));

    return tpl;
  } else {
    return null;
  }
}

/**
 * Checks if the given folder is a valid knick-knack project template
 */
function isTemplate(tplPath) {
  return _isValidConfig(fsUtil.readYaml(_getConfigPath(tplPath)));
}

function _isValidConfig(config) {
  return !! (config && _.isString(config.description));
}

function _getConfigPath(tplPath){
  return tplPath + '/config.yml';
}

function _loadTemplateHooks(tplProcessPath) {
  var hooks = {};

  if (fsUtil.isFile(tplProcessPath)) {
    var tplProcess = require(tplProcessPath);

    if (typeof tplProcess == 'function') {
      hooks.after = tplProcess;
    } else {
      if (! tplProcess.before && ! tplProcess.after) {
        console.warn('process.js exports neither "before" nor "after" hook. Forgot to assign module.exports?');
      }

      hooks.before = tplProcess.before;
      hooks.after = tplProcess.after;
    }
  }

  return hooks;
}



// TODO

/**
 * Searches through all files in the given folder except the ones who match one of the excludes
 * in noProcess.
 */
function _extractVariablesFromFiles(templateFilesPath, noProcess) {
  if (noProcess) {
    noProcess = noProcess.map(function (pattern) {
      return pattern.replace(/\*/g, '');
    });
  }

  return _process(templateFilesPath);

  function _process(path, vars) {
    vars = vars || {};

    if (! _shouldProcess(relpath(path), noProcess)) {
      return vars;
    }

    if (fs.lstatSync(path).isDirectory()) {
      var files = fs.readdirSync(path);

      files.forEach(function (file) {
        _process(path + '/' + file, vars); // recursion
      });
    } else if (! fsUtil.isBinary(path)) {
      var file = fs.readFileSync(path, 'utf8');
      _.extend(vars, _extractVariables(file));
    }

    return vars;
  }

  function relpath(path) {
    return path.substr(templateFilesPath.length);
  }
}

function _shouldProcess(path, noProcess) {
  var should = true;
  if (noProcess) {
    should = ! noProcess.some(matches);
  }
  return should;

  function matches(pattern) {
    return _strcontains(path, pattern);
  }
}

function _extractVariables(file) {
  var variableRegex = /\{\{\s*(\S+)\s*\}\}/g,
      m,
      results = {};

  while ((m = variableRegex.exec(file)) !== null) {
    results[m[1]] = true;
  }
  return results;
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
function _getRequiredVariables(baseFolder, templatePath) {
  var config, globalConfig, variables;

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

function exportFuncs(/* funcs */) {
  _.extend(module.exports, _.indexBy(arguments, 'name'));
}
