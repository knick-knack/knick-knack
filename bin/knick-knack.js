#!/usr/bin/env node

'use strict';

var program        = require('commander'),
    projectVersion = require('../package.json').version,
    _              = require('underscore'),
    chalk          = require('chalk'),
    logSymbols     = require('log-symbols'),
    defaultDir     = process.env.HOME + '/.knick-knack';

program
  .version(projectVersion)
  .option('-d, --directory [folder]', 'Specify the folder where knick-knack should look for project templates [' + defaultDir + ']', defaultDir);

//specify additional help text
program.on('--help', function(){
  console.log('  ' + chalk.cyan.underline('Commands:'));
  console.log('');
  console.log('    $ knick-knack                    List all available project templates');
  console.log('    $ knick-knack init               Initialize a valid knick-knack project templates folder');
  console.log('    $ knick-knack check              Check which "features" the project in the current folder has (eg. a GIT project, Jenkins job,...)');
  console.log('    $ knick-knack xp/rest-client     Generate a new xp project of type rest-client');
  console.log('    $ knick-knack add general/readme Add a readme partial to an existing project');
  console.log('    $ knick-knack create git-project Create a Git project for the project in the current folder');
  console.log('    $ knick-knack create jenkins-job Create a Jenkins job for the project in the current folder');
  console.log('');
});

program.parse(process.argv);
var additionalArgs = program.args,
    directory      = program.directory;

var list = require('../lib/list'),
    init = require('../lib/init');

/* Find the right subroutine to call */
switch (additionalArgs[0]) {
  case undefined:
    var templates = list.listProjects(directory);
    if (_.size(templates) >= 1) {
      console.log(chalk.yellow(' A valid template name must be specified.\n'));
      console.log(chalk.cyan.underline('Available templates:'));
      console.log(templates.join('\n'));
      console.log('\n');
      console.log('You can generate a new project with ' + chalk.blue.bold('knick-knack TEMPLATE') + '\n');
      console.log('For more information see https://github.com/haimich/knick-knack');
    } else {
      console.log(logSymbols.warning + chalk.magenta(' No templates found in "' + directory + '".\n'));
      console.log(chalk.blue('Is this your first time using knick-knack? If you want to set up your project template folder you can simply run ') + chalk.blue.bold('knick-knack init'));
    }
    break;
  case 'init':
    init.createTemplateFolder(directory);
    break;
  case 'check':
    console.log('check');
    break;
  case 'add':
    console.log('add ' + additionalArgs[1]);
    break;
  case 'create':
    console.log('create ' + additionalArgs[1]);
    break;
  default:
    console.log('generate ' + additionalArgs[0]);
}