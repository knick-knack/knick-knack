'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
    multiline  = require('multiline');

function createFolders(folder, success) {
  var template = folder + '/sample',
      readme   = folder + '/general/readme';

  mkdirp.sync(template + '/files');
  success(template);
  mkdirp.sync(readme + '/files');
  success(readme);
}

function createConfigFile(folder, success) {
  var config = folder + '/sample/config.yml',
      data = multiline(function(){/*
description: Create a Go API project.

variables:
  - name: A sample name

partials:
  - general/readme
*/});
  
  fs.writeFileSync(config, data, 'utf8');
  success(config);
}

function createTemplateFile(folder, success) {
  var changelog = folder + '/sample/files/Changelog',
      data = 'This is just a sample file with {{ name }}';
  
  fs.writeFileSync(changelog, data, 'utf8');
  success(changelog);
}

function createPartialFile(folder, success) {
  var readme = folder + '/general/readme/files/README.md',
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
exports.createTemplateFile = createTemplateFile;
exports.createPartialFile = createPartialFile;