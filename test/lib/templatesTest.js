'use strict';

var codebase      = '../../lib/',
    testbase      = __dirname + '/../testdata/template/',
    expect        = require('chai').expect,
    fs            = require('fs'),
    sut           = require(codebase + 'template'),
    sinon         = require('sinon');

describe('template', function() {
  describe('isValidConfig', function() {
    describe('when given a valid config object', function() {
      it('should return true', function() {
        expect(sut._isValidConfig({ description: 'foo' })).to.be.true;
      });
    });
  
    describe('when given an invalid config object', function() {
      it('should return false for an object without description property', function() {
        expect(sut._isValidConfig({})).to.be.false;
      });
      
      it('should return false for null', function() {
        expect(sut._isValidConfig(null)).to.be.false;
        expect(sut._isValidConfig({ description: 123 })).to.be.false;
      });
      
      it('should return false for description not being a string', function() {
        expect(sut._isValidConfig({ description: 123 })).to.be.false;
      });
    });
  });
  
  describe('isTemplate', function() {
    describe('when given a valid project folder', function() {
      it('should return true', function() {
        expect(sut.isTemplate(testbase + 'valid')).to.be.true;
      });
    });
  
    describe.skip('when given an invalid project folder', function() {
      it('should return false for a non-existing directory', function() {
        expect(sut.isTemplate(testbase + 'no-dir')).to.be.false;
      });
      
      it('should return false for folder without a config file', function() {
        expect(sut.isTemplate(testbase + 'no-config')).to.be.false;
      });
      
      it('should return false for folder with an invalid config file', function() {
        expect(sut.isTemplate(testbase + 'invalid-config')).to.be.false;
      });
    });
  });
  
  describe('loadTemplateHooks', function () {
    var sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
    });
  
    afterEach(function () {
      sandbox.restore();
    });
    
    it('should treat template hooks as being optional', function () {
      expect(function () {
        sut._loadTemplateHooks(testbase + 'valid-no-process/process.js');
      }).to.not.throw();
    });
    
    it('should treat a function export of process module as the "after" template hook', function () {
      var tplProcessPath = testbase + 'process-test/simple.js',
          tplProcess = require(tplProcessPath),
          hooks = sut._loadTemplateHooks(tplProcessPath);
          
      expect(hooks.after).to.equal(tplProcess);
    });
    
    it('should warn for process modules without exports', function () {
      sandbox.stub(console, 'warn'); 
      sut._loadTemplateHooks(testbase + 'process-test/no-export.js');
      expect(console.warn.calledOnce).to.be.true;
      expect(console.warn.args[0][0].indexOf('export') != -1).to.be.true;
    });
  });
  
  describe('loadTemplate', function () {
    describe('when given an invalid template', function () {
      it('should return null', function() {
        expect(sut.loadTemplate(testbase + 'invalid-config')).to.be.null;
      });  
    });
    
    describe('when given a valid template', function () {
      it('should return a template object with the template config', function() {
        expect(sut.loadTemplate(testbase + 'valid').config).to.deep.equal({ description: 'foo' });
      });
      
      it('should return a template object with the template config and the template hooks', function() {
        var tpl = sut.loadTemplate(testbase + 'valid'),
            tplProcess = require(testbase + 'valid/process');
            
        expect(tpl.before).to.equal(tplProcess.before);
        expect(tpl.after).to.equal(tplProcess.after);
      });
      
      it('should return a template object with a files property when directory present', function() {
        var tpl = sut.loadTemplate(testbase + 'valid');
        expect(tpl.files).to.equal(testbase + 'valid/files');
      });
      
      it('should treat the files folder as being optional', function() {
        expect(sut.loadTemplate(testbase + 'valid-no-process').files).to.not.be.ok;
      });
    });
  });
  
  describe('extractVariables()', function() {
    it('should return the correct variables for test file 1', function() {
      var file = fs.readFileSync(testbase + '/python-config/files/config-dev.yml', 'utf8');
      var vars = sut._extractVariables(file);
      expect(Object.keys(vars).length).to.equal(2);
      expect(vars.name).to.exist;
      expect(vars.user).to.exist;
    });
  
    it('should return the correct variables for test file 2', function() {
      var file = fs.readFileSync(testbase + '/python-config/files/config-prod.yml', 'utf8');
      var vars = sut._extractVariables(file);
      expect(Object.keys(vars).length).to.equal(1);
      expect(vars.name).to.exist;
    });
  });
  
  describe('extractVariablesFromFiles()', function() {
    describe('when given no noProcess field', function() {
      it('should extract all variables found in the files and folders', function() {
        var vars = sut._extractVariablesFromFiles(testbase + '/python-config');
        expect(Object.keys(vars).length).to.equal(3);
        expect(vars.name).to.exist;
        expect(vars.user).to.exist;
        expect(vars.yourscript).to.exist;
        expect(vars.badDelimiters).to.not.exist;
      });
    });
  
    describe('when given a noProcess field', function() {
      it('should extract all variables found in files and folders not affected by the filtering', function() {
        var noProcess = ['not_modules', '.gitignore'],
            vars = sut._extractVariablesFromFiles(testbase + '/python-config', noProcess);
        expect(vars.name).to.exist;
        expect(vars.user).to.exist;
        expect(vars.yourscript).to.not.exist;
      });
  
      it('should extract all variables found in files and folders filtered using wildcards', function() {
        var noProcess = ['*modules*'],
            vars = sut._extractVariablesFromFiles(testbase + '/python-config', noProcess);
        expect(vars.name).to.exist;
        expect(vars.user).to.exist;
        expect(vars.yourscript).to.not.exist;
      });
  
      it('should extract all variables found in files and folders filtered using wildcards', function() {
        var noProcess = ['config*'],
            vars = sut._extractVariablesFromFiles(testbase + '/python-config', noProcess);
        expect(vars.name).to.not.exist;
        expect(vars.user).to.not.exist;
        expect(vars.yourscript).to.exist;
      });
    });
  });

});