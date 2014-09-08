'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
    chalk      = require('chalk'),
    logSymbols = require('log-symbols'),
    inquirer   = require('inquirer'),
    multiline  = require('multiline'),
    sampleData = require('./util/sampleData'),
    yaml       = require('js-yaml');

function printCreatedMsg(folder, additionalText) {
  console.log(logSymbols.success + chalk.white(' ' + folder) + chalk.gray(additionalText || ''));
}

function createFolder(folder) {
  mkdirp.sync(folder);
  printCreatedMsg(folder, ' (this is the folder where you can place your own project templates)');
  
  var globalConfig = {
    variables: [{'name': 'My awesome project'}]
  };
  var document = yaml.safeDump(globalConfig);
  fs.writeFileSync(folder + '/config.yml', document, 'utf8');
  printCreatedMsg('config.yml', ' (this is the file where you can place global configuration options)');
  
  console.log('\n');
}

/**
 * Creates a new template folder in the user's home directory
 */
function createTemplateFolder(folder) {
  if (fs.existsSync(folder)) {
    console.log(chalk.magenta('Folder "' + folder + '" already exists. Please delete it manually first if you want to create a fresh template folder.'));
    return;
  }
  
  var data = multiline(function(){/*
            
 /)))))))))      _          _      _         _                     _    
//) __   __\    | | ___ __ (_) ___| | __    | | ___ __   __ _  ___| | __
C==/_o|^|o_\    | |/ / '_ \| |/ __| |/ /____| |/ / '_ \ / _` |/ __| |/ /
|      _\  )    |   <| | | | | (__|   <_____|   <| | | | (_| | (__|   < 
 \   '---'/     |_|\_\_| |_|_|\___|_|\_\    |_|\_\_| |_|\__,_|\___|_|\_\
_/`-. __.'_ 
           \
*/});
  console.log('\n' + data);
  
  console.log(chalk.cyan.underline('Welcome to the setup assistant!\n'));
  
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
      createFolder(folder);
      
      inquirer.prompt(sampleQuestion, function(answer) {
        if (answer.createSample) {
          sampleData.createFolders(folder, printCreatedMsg);
          sampleData.createConfigFile(folder, printCreatedMsg);
          sampleData.createTemplateFile(folder, printCreatedMsg);
          sampleData.createPartialFile(folder, printCreatedMsg);
          console.log('');
        }
      });
    }
  });
}

exports.createTemplateFolder = createTemplateFolder;