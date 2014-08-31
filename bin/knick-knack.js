#!/usr/bin/env node

'use strict';

var fs             = require('fs'),
    program        = require('commander'),
    chalk          = require('chalk'),
    logSymbols     = require('log-symbols');

var projectVersion = require('../package.json').version,
    defaultDir     = process.env.HOME + '/.knick-knack';

program
  .version(projectVersion)
  .option('-d, --directory [directory]', 'Specify the directory where knick-knack should look for templates [' + defaultDir + ']', defaultDir);

program.on('--help', function () {
  console.log('  ' + chalk.cyan.underline('Commands:'));
  console.log();
  console.log('    $ knick-knack [list]             List all available knick-knack templates');
  console.log('    $ knick-knack [template-name]    Generate a new project based on a template');
  console.log('    $ knick-knack add general-readme Add a readme partial to the project in the current directory');
  console.log('    $ knick-knack init               Initialize a knick-knack templates directory');
  console.log();
});

program.parse(process.argv);

var additionalArgs = program.args,
    directory      = program.directory;

var list     = require('../lib/list'),
    init     = require('../lib/init'),
    generate = require('../lib/generate');

if (! fs.existsSync(directory) || ! fs.statSync(directory).isDirectory()) {
  console.error(chalk.yellow('"' + directory + '" is no directory.'));
  console.log('Is this your first time using knick-knack? If you want to set up your project templates directory you can simply run ' + chalk.blue.bold('knick-knack init'));
  return;
}

switch (additionalArgs[0]) {
case 'list':
case undefined:
  var templates = list.listTemplates(directory);

  if (templates.length > 0) {
    console.log(chalk.yellow('A valid template name must be specified.'));
    console.log();
    console.log(chalk.cyan.underline('Available templates:'));
    console.log(templates.join('\n'));
    console.log();
    console.log('You can generate a new project with ' + chalk.blue.bold('knick-knack TEMPLATE'));
    console.log();
    console.log('For more information see https://github.com/haimich/knick-knack');
    console.log();
  } else {
    console.log(logSymbols.warning + chalk.magenta(' No templates found in "' + directory + '".'));
    console.log();
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
default: // not a command, maybe a template name?
  generate.createProject(additionalArgs[0]);
}
