'use strict';

//Command line argument parser
//
//Options:
// --help, -h:         show usage information
// no options:         list all project templates
// init:               initialize a valid knick-knack project templates folder
// xp/rest-client:     generate a new xp project of type rest-client
// check:              check which "features" the project in the current folder has (eg. a GIT project, Jenkins job,...)
// create git-project: create a Git project for the project in the current folder
// create jenkins-job: create a Jenkins job for the project in the current folder
// add general/readme: add a readme partial to an existing project
// -d ~/.knick-knack:  specify the folder where knick-knack should look for project templates [optional]