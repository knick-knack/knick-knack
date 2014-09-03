'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
    chalk      = require('chalk'),
    logSymbols = require('log-symbols'),
    inquirer   = require('inquirer'),
    multiline  = require('multiline'),
    sampleData = require('./util/sampleData');

/**
 * 
 */
function createTemplateFolder(folder) {
  if (fs.existsSync(folder)) {
    console.log(chalk.magenta('Folder "' + folder + '" already exists. Please delete it manually first if you want to create a fresh template folder.'));
    return;
  }
  
  var data = multiline(function(){/*
 /)))))))))
//) __   __\
C==/_o|^|o_\
|      _\  )
 \   '---'/
_/`-. __.'_
           \
*/});
  console.log('\n' + data);
  
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
      createTemplateFolders(folder);
      
      inquirer.prompt(sampleQuestion, function(answer) {
        if (answer.createSample) {
          sampleData.createFolders(folder, printCreatedMsg);
          sampleData.createConfigFile(folder, printCreatedMsg);
          sampleData.createProjectFile(folder, printCreatedMsg);
          sampleData.createPartialFile(folder, printCreatedMsg);
          console.log('');
        }
      });
    }
  });
}

function createTemplateFolders(folder) {
  mkdirp.sync(folder);
  console.log(logSymbols.success + chalk.white(' ' + folder));
  
  var projects = folder + '/projects',
      partials = folder + '/partials';
      
  mkdirp.sync(projects);
  printCreatedMsg(projects, ' (this is the folder where you can place your project templates)');
  
  mkdirp.sync(partials);
  printCreatedMsg(partials, ' (here you can put template files when you want to reuse them in several projects)');
  console.log('\n');
}

function printCreatedMsg(folder, additionalText) {
  console.log(logSymbols.success + chalk.white(' ' + folder) + chalk.gray(additionalText || ''));
}

exports.createTemplateFolder = createTemplateFolder;