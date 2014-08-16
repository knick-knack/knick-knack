'use strict';

var fs       = require('fs'),
    chalk    = require('chalk'),
    inquirer = require('inquirer');

/**
 * 
 */
function createTemplateFolder(folder) {
  if(fs.existsSync(folder)) {
    console.log(chalk.magenta('Folder "' + folder + '" already exists. Please delete it manually first if you want to create a fresh template folder.'));
    return;
  }
  
  var question = [{
    type: 'confirm',
    name: 'continue',
    message: 'This will initialize a fresh template folder named ' + folder + '. Do you want to continue?',
    default: true
  }];
  
  console.log(chalk.cyan.underline("Welcome to knick-knack's setup assistant!\n"))
  inquirer.prompt(question, function(answer) {
    console.log(answer);
  });
}

exports.createTemplateFolder = createTemplateFolder;