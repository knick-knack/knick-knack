'use strict';

var templ = require('./util/template');

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
  
  var config = templ.readConfigFile(path);
  
}

exports.createProject = createProject;