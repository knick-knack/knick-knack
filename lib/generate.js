'use strict';

var fs    = require('fs'),
    templ = require('./template');

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
  var path = templateFolder + '/' + templateName;
  
  if (!templ.isValidProjectTemplate(path)) {
    throw new Error('The given template is not valid. Check the path: "' + path + '"');
  }
  
  var config = templ.readConfigFile(path),
      defaults        = config.defaults,
      variablesNeeded = templ.getRequiredVariables(path);
  variablesNeeded.push('name'); //name is always neededfor folder name
  
  if (! skipQuestions) {
    //TODO
    console.log('Ask questions');
  }
  
  //TODO: check if all variables are set
  
  if (! defaults.name) {
    throw new Error('If you want to skip the questions you have to provide a default value for the name in your config.yml');
  }
  fs.mkdirSync(defaults.name);
}

exports.createProject = createProject;