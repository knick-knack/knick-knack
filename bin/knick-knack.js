#!/usr/bin/env node
'use strict';

var program    = require('commander'),
    chalk      = require('chalk'),
    logSymbols = require('log-symbols'),
    inquirer   = require('inquirer'),
    fsUtil     = require('../lib/util/fs');

var projectVersion = require('../package.json').version,
    defaultDir     = process.env.HOME + '/.knick-knack';

program
  .version(projectVersion)
  .option('-d, --directory [directory]', 'Specify the directory where knick-knack should look for templates [' + defaultDir + ']', defaultDir)
  .option('-v, --verbose', 'Activate verbose mode');

program.on('--help', function () {
  console.log('  ' + chalk.cyan.underline('Commands:'));
  console.log();
  console.log('    $ knick-knack                    List all available knick-knack templates');
  console.log('    $ knick-knack [template-name]    Generate a new project based on a template');
  console.log('    $ knick-knack add general/readme Add a readme partial to the project in the current directory');
  console.log('    $ knick-knack init               Initialize a knick-knack templates directory');
  console.log();
});

program.parse(process.argv);

var additionalArgs = program.args,
    directory      = program.directory;

var cmd_list     = require('../lib/list'),
    cmd_init     = require('../lib/init'),
    cmd_generate = require('../lib/generate');

function folderInvalid(name) {
  if (! fsUtil.isDirectory(name) && name !== defaultDir && additionalArgs[0] !== 'init') {
    //the user passed in an invalid folder with -d but did not want to create one with "init"
    return true;
  }
  return false;
}

if (folderInvalid(directory)) {
  console.error(chalk.yellow('"' + directory + '" is not a valid directory.'));
  return;
}

switch (additionalArgs[0]) {
case 'init':
  cmd_init(directory);
  break;

case undefined:
  if (! fsUtil.isDirectory(directory)) {
    console.log('This seems to be the first time you\'re using knick-knack.\n');

    var continueQuestion = {
      name: 'continue',
      type: 'confirm',
      message: 'May I suggest that I start the setup assistant for you?',
      default: true
    };
    inquirer.prompt(continueQuestion, function(answer) {
      if (answer.continue) {
        cmd_init(directory);
      }
    });
    return;
  }

  var templates = cmd_list(directory);

  if (templates.length > 0) {
    console.log(chalk.cyan.underline('\nAvailable templates:'));
    console.log(templates.join('\n') + '\n');
    console.log('You can generate a new project with ' + chalk.blue.bold('knick-knack TEMPLATE') + '\n');
    console.log('For more information see https://github.com/knick-knack/knick-knack\n');
  } else {
    console.log(logSymbols.warning + chalk.magenta(' No templates found in "' + directory + '".'));
    console.log();
  }

  break;

case 'add':
  console.log('add ' + additionalArgs[1]);
  break;

case 'create':
  console.log('create ' + additionalArgs[1]);
  break;

default: // not a command, maybe a template name?
  try {
    cmd_generate(directory + '/' + additionalArgs[0]);
  } catch (err) {
    console.log(logSymbols.warning + ' ' + chalk.magenta(err));
    throw err;
  }
}
