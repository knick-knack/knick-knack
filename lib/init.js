'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
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
  
  console.log(chalk.cyan.underline("Welcome to knick-knack's setup assistant!\n"));
  
  var continueQuestion = {
    name: 'continue',
    type: 'confirm',
    message: 'This will create a fresh template folder named ' + folder + '. Do you want to continue?',
    default: true
  };
  var sampleQuestion =  {
    name: 'createSample',
    type: 'confirm',
    message: 'Do you want knick-knack to create a sample template for you?',
    default: false
  };
  
  inquirer.prompt(continueQuestion, function(answer) {
    if (answer.continue) {
      mkdirp.sync(folder);
      console.log(logSymbols.success + chalk.white(' ' + folder));
      
      var projects = folder + '/projects',
          partials = folder + '/partials';
          
      mkdirp.sync(projects);
      printFolderCreatedMsg(projects, ' (this is the folder where you can place your project templates)');
      
      mkdirp.sync(partials);
      printFolderCreatedMsg(partials, ' (here you can put template files when you want to reuse them in several projects)');
      console.log('\n');
      
      inquirer.prompt(sampleQuestion, function(answer) {
        if (answer.createSample) {
          var sample = folder + '/projects/sample';
          
          mkdirp.sync(sample + '/files');
          printFolderCreatedMsg(sample);
          
          createSampleConfigFile(sample);
          createSampleProjectFile(sample);
        }
      });
    }
  });
}

function createSampleConfigFile(folder) {
  
}

function createSampleProjectFile(folder) {
  
}

function printFolderCreatedMsg(folder, additionalText) {
  console.log(logSymbols.success + chalk.white(' ' + folder) + chalk.gray(additionalText || ''));
}

exports.createTemplateFolder = createTemplateFolder;