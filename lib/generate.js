'use strict';

var yaml  = require('js-yaml'),
    fs    = require('fs'),
    templ = require('./util/template');

/**
 * Create a new project from a template.
 * - ask the user which values the variables in the template should have
 * - create a new folder <name>
 * - copy all files from the template to the new folder and replace all variables
 * 
 * @param templateFolder (string)  the path containing the project templates
 * @param templateName   (string)  the name of the template for the new project
 * @param skipQuestions  (boolean) pass true when -
 */
function createProject(templateFolder, templateName, skipQuestions) {
  var path = templateFolder + '/projects/' + templateName;
  
  if (!templ.isValidProjectTemplate(path)) {
    throw new Error('The given template is not valid. Check the path: "' + path + '"');
  }
  
  var configPath = path + '/config.yml',
      config = readConfigFile(configPath);
  
}

function readConfigFile(path) {
  try {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    throw new Error('Could not read config.yml in folder "' + path + '"');
  }
}

exports.createProject = createProject;