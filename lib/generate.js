'use strict';

var _        = require('lodash'),
    fs       = require('fs'),
    fsUtil   = require('./util/fs'),
    template = require('./template'),
    ui       = require('./util/ui');

module.exports = generateProject;

if (process.env.NODE_ENV === 'test') {
  exportFuncs(
    _extractVariablesFromFiles,
    _extractVariables
  );
}

generateProject._processFiles = _processFiles;

function generateProject(tplPath, silent) {
  var config = template.readConfig(tplPath),
      name = config.variables.name;

  if (silent && ! name) {
    throw new Error('No name given');
  }

  var tplProcessFile = tplPath + '/process.js',
      tplProcess;

  if (fsUtil.isFile(tplProcessFile)) {
    tplProcess = require(tplProcessFile);
  }

  // ui.prompt('Projektname?', config.variables.name, function (text) {

  // });

  // tpl.before();
   var destPath = '/tmp/knick-knack-test';//context.destination;

  //fs.mkdirSync(destPath);
  //_processFiles(tplPath + '/files', destPath);

  // tpl.after();
}

function _processFiles(srcDir, destDir, depth) {
  fsUtil.list(srcDir).forEach(function (file) {
    var srcPath = srcDir + '/' + file,
        destPath = destDir + '/' + file;

    if (fsUtil.isDirectory(srcPath)) {
      fs.mkdirSync(destPath);
      _processFiles(srcPath, destPath, (depth || 0) + 1);
    } else if (! _ignore(file, depth)) {
      fsUtil.copy(srcPath, destPath);
    }
  });
}

function _ignore(name, depth) {
  return (name === 'config.yml' || name === 'index.js') && ! depth;
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

  var vars = {};

  fsUtil.walk(templateFilesPath, function (path, info) {
    var process = _shouldProcess(relpath(path), noProcess);

    if (process && ! info.isDirectory && ! fsUtil.isBinary(path)) {
      _.extend(vars, _extractVariables(fs.readFileSync(path, 'utf8')));
    }

    return process;
  });

  return vars;

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

function _strcontains(str, substr) {
  return str.indexOf(substr) !== -1;
}

var variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

function _extractVariables(file) {
  var match, results = {};

  while ((match = variableRegex.exec(file)) !== null) {
    results[match[1]] = true;
  }

  return results;
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
