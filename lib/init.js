'use strict';

var fs         = require('fs'),
    chalk      = require('chalk'),
    logSymbols = require('log-symbols'),
    inquirer   = require('inquirer');

/**
 * 
 */
function createTemplateFolder(folder) {
  if (fs.existsSync(folder)) {
    console.log(chalk.magenta('Folder "' + folder + '" already exists. Please delete it manually first if you want to create a fresh template folder.'));
    return;
  }
  
  var question = [{
    name: 'continue',
    type: 'confirm',
    message: 'This will create a fresh template folder named ' + folder + '. Do you want to continue?',
    default: true
  }];
  
  console.log(chalk.cyan.underline("Welcome to knick-knack's setup assistant!\n"))
  inquirer.prompt(question, function(answer) {
    if (answer.continue) {
      fs.mkdirSync(folder);
      console.log(logSymbols.success + chalk.white(' ' + folder));
      
      fs.mkdirSync(folder + '/projects');
      console.log(logSymbols.success + chalk.white(' ' + folder + '/projects ' + chalk.gray('(this is the folder where you can place your project templates)')));
      
      fs.mkdirSync(folder + '/partials');
      console.log(logSymbols.success + chalk.white(' ' + folder + '/partials ' + chalk.gray('(here you can put template files when you want to reuse them in several projects)')));
      console.log('\n');
    }
  });
}

exports.createTemplateFolder = createTemplateFolder;