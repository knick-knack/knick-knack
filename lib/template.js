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
    _loadTemplateHooks
  );
}

/**
 * Gather all template related information from a given template path.
 */
function loadTemplate(tplPath) {
  if (isTemplate(tplPath)) {
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

function _getConfigPath(tplPath) {
  return tplPath + '/config.yml';
}

function _loadTemplateHooks(tplProcessPath) {
  var hooks = {};

  if (fsUtil.isFile(tplProcessPath)) {
    var tplProcess = require(tplProcessPath);

    if (typeof tplProcess === 'function') {
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

function exportFuncs(/* funcs */) {
  _.extend(module.exports, _.indexBy(arguments, 'name'));
}
