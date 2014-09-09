'use strict';

var fs           = require('fs'),
    isBinaryFile = require('isbinaryfile'),
    fsutil       = require('./util/filesystem'),
    yaml         = require('js-yaml'),
    _            = require('lodash');

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
  return fs.existsSync(folder + '/config.yml') && _.isString(readDescription(folder));
}

/**
 * Parses the config.yml in a project folder and returns the description field.
 */
function readDescription(folder) {
  return readConfigFile(folder).description;
}

function extractVariables(file) {
  return [];
}

function mergeVariableLists(variableList1, variableList2) {
  var result = variableList1.concat(variableList2);
  
  return _.uniq(result, 'name');
  
  /*for (var i = 0; i < variableList1.length; i++) {
    var containsItem = false;
    
    for (var j = 0; i < variableList2.length; i++) {
      if (variableList2[j].name === variableList1[i].name) {
        containsItem = true;
        break;
      }
    }
    
    if (! containsItem) {
      result.push(variableList1)
    }
  }*/
}

function readAllFiles(folder, result) {
  var files = fs.readdirSync(folder);
  if(files && files.length && files.length > 0) {
    files.forEach(function(item) {
      var pathString = folder + '/' + item;
      
      if(fs.lstatSync(pathString).isDirectory()) {
        return mergeVariableLists(result, readAllFiles(pathString)); //recurse
      } else {
        if (! isBinaryFile(pathString)) {
          var file = fs.readFileSync(pathString, 'utf8');
          var vars = extractVariables(file);
          return mergeVariableLists(result, vars);
        }
      }
    });
  } else {
    return result;
  }
}

/**
 * Searches through all files in the given folder except the ones who match one of the excludes
 * in noProcess.
 * 
 * @param     string templateFilesPath The path where the template files are located
 * @noProcess array  noProcess         A list of strings that represent folder or file excludes
 * @return    array                    A list of all variables found in the template files
 */
function extractVariablesFromFiles(templateFilesPath, noProcess) {
  var variables = [];
  
  if (fsutil.folderExists(templateFilesPath)) {
    variables = readAllFiles(templateFilesPath);
  }
  
  return variables;
  //for all files and folders found:
  //  * if the name matches one of the patterns: skip (evtl. mit array.filter lösen)
  //  * else: if file is binary skip (https://www.npmjs.org/package/isbinaryfile)
  //  * else: read content and check for occurences of a regex {{<any number of whitespaces>variableName<any number of whitespaces>}} => the delimiters should be configurable
  //maybe we should store the information which files have variables in it?
}

function convertConfigVariables(variables) {
  if (! variables)
    return;
  
  var convertedVars = [];
  _.each(variables, function(elem) {
    var name = _.keys(elem)[0];
    var obj = _.extend({'name': name }, elem[name]);
    convertedVars.push(obj);
  });
  
  return convertedVars;
}

/**
 * Go through all files in the given template and it's partials and gather all variables
 * to be filled out by the user.
 * @param  string baseFolder     The knick-knack folder
 * @param  string templatePath   The folder where the template lies  
 * @return array                 A list of unique variables sorted by occurence
 */
function getRequiredVariables(baseFolder, templatePath) {
  var config       = readConfigFile(templatePath),
      globalConfig = readConfigFile(baseFolder),
      variables;
  
  // - parse files and search for variables not yet present
  // - for every partial:
  //    - read variables of current template (importance: 2 - deeper nested template variables are less important)
  //       * in case of conflict: 
  //    - parse files and search for variables not yet present
  // - read global config variables (importance: 3 - can be overwritten by any template variable declaration)
  
  //keep in mind that variables have an order as specified in the config files
  
  //read variables of current template (importance: 1 - never overwrite)
  variables = convertConfigVariables(config.variables);
  return []
}

exports.isValidProjectTemplate = isValidProjectTemplate;
exports.readDescription = readDescription;
exports.readConfigFile = readConfigFile;
exports.getRequiredVariables = getRequiredVariables;
exports.convertConfigVariables = convertConfigVariables;
exports.extractVariablesFromFiles = extractVariablesFromFiles;
exports.mergeVariableLists = mergeVariableLists;