'use strict';

var glob = require('glob');

function listProjects(folder) {
  glob('/projects/*', { root: folder }, function (er, files) {
    console.log(files);
  })
}

exports.listProjects = listProjects;