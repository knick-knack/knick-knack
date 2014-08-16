'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
    multiline  = require('multiline');

function createFolders(folder, success) {
  var project = folder + '/projects/sample',
      partial = folder + '/partials/general/readme';

  mkdirp.sync(project + '/files');
  success(project);
  mkdirp.sync(partial);
  success(partial);
}

function createConfigFile(folder, success) {
  var config = folder + '/projects/sample/config.yml',
      data = multiline(function(){/*
type: api
language: go
description: Create a Go API project.

partials:
  - general/readme
*/});
  
  fs.writeFileSync(config, data);
  success(config);
}

function createProjectFile(folder, success) {
  var changelog = folder + '/projects/sample/files/Changelog',
      data = 'This is just a sample file';
  
  fs.writeFileSync(changelog, data);
  success(changelog);
}

function createPartialFile(folder, success) {
  var readme = folder + '/partials/general/readme/README.md',
      data = 'You have been\n\n' + multiline(function(){/*
  _          _      _         _                     _            _   _ 
 | | ___ __ (_) ___| | __    | | ___ __   __ _  ___| | _____  __| | | |
 | |/ / '_ \| |/ __| |/ /____| |/ / '_ \ / _` |/ __| |/ / _ \/ _` | | |
 |   <| | | | | (__|   <_____|   <| | | | (_| | (__|   <  __/ (_| | |_|
 |_|\_\_| |_|_|\___|_|\_\    |_|\_\_| |_|\__,_|\___|_|\_\___|\__,_| (_)
                                                                       
*/}) + '\n\n';
      
  fs.writeFileSync(readme, data);
  success(readme);
}

exports.createFolders = createFolders;
exports.createConfigFile = createConfigFile;
exports.createProjectFile = createProjectFile;
exports.createPartialFile = createPartialFile;