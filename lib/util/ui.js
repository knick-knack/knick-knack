'use strict';

var inquirer = require('inquirer');

module.exports = {
  prompt: prompt
};

function prompt(message, def, done) {
  var question = {
    type: 'input',
    name: 'text',
    message: message
  };

  if (def) {
    question.default = def;
  }

  inquirer.prompt(question, function (res) {
    done(res.text);
  });
}
