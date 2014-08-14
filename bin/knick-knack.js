#!/usr/bin/env node

'use strict';

var program = require('commander');
var projectVersion = require('../package.json').version;

program
  .version(projectVersion)
  .option('-d, --directory [folder]', 'Specify the folder where knick-knack should look for project templates [~/.knick-knack]', '~/.knick-knack');

//specify additional help text
program.on('--help', function(){
  console.log('  Commands:');
  console.log('');
  console.log('    $ knick-knack                    List all available project templates');
  console.log('    $ knick-knack init               Initialize a valid knick-knack project templates folder');
  console.log('    $ knick-knack check              Check which "features" the project in the current folder has (eg. a GIT project, Jenkins job,...)');
  console.log('    $ knick-knack xp/rest-client     Generate a new xp project of type rest-client');
  console.log('    $ knick-knack add general/readme Add a readme partial to an existing project')
  console.log('    $ knick-knack create git-project Create a Git project for the project in the current folder');
  console.log('    $ knick-knack create jenkins-job Create a Jenkins job for the project in the current folder');
  console.log('');
});

program.parse(process.argv);
var additionalArgs = program.args;

switch (additionalArgs[0]) {
  case undefined:
    console.log('list');
    break;
  case 'init':
    console.log('init');
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