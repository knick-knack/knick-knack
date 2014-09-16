'use strict';

var fs         = require('fs'),
    mkdirp     = require('mkdirp'),
    multiline  = require('multiline');

function createTemplates(folder, success) {
  var template = folder + '/sample',
      readme   = folder + '/general/readme';

  mkdirp.sync(template + '/files');
  success(template);
  mkdirp.sync(readme + '/files');
  success(readme);
  
  createConfigFiles(folder, success);
  createTemplateFile(folder, success);
  createPartialFile(folder, success);
}

function createConfigFiles(folder, success) {
  var config1 = folder + '/sample/config.yml',
      config2 = folder + '/general/readme/config.yml',
      data1 = multiline(function(){/*
description: Create a Go API project.

variables:
  - name: A sample name

partials:
  - general/readme
*/}),
     data2 = 'description: Simply a readme file.';
  
  fs.writeFileSync(config1, data1, 'utf8');
  success(config1);
  fs.writeFileSync(config2, data2, 'utf8');
  success(config2);
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

exports.createTemplates = createTemplates;