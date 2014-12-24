'use strict';

var codebase = '../../lib/',
    testbase = __dirname + '/../testdata/template/',
    testdest = '/tmp/knick-knack-test',
    expect   = require('chai').expect,
    sinon    = require('sinon'),
    sut      = require(codebase + 'generate'),
    fs       = require('fs'),
    fsUtil   = require(codebase + 'util/fs');

describe.skip('command generate', function () {

  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should throw an error if no name was given in the config file', function () {
    sandbox.spy(sut, '_processFiles');

    expect(function() { sut(testbase + 'sample_project'); }).to.throw(Error);
  });

  it('should not require a process.js', function () {
    sandbox.spy(sut, '_processFiles');
    expect(function () {
      sut(testbase + 'general/no-process/');
    }).to.not.throw();
  });

  it('should call before and after hooks', function () {
    var beforeCalled, afterCalled;

    // var tplPath = testbase + 'general/readme/',
    //     tplProcessFile = tplPath + 'process.js',
    //     tplProcess = require(tplProcessFile);

    // tplProcess.before = function () { beforeCalled = true; };
    // tplProcess.after = function () { afterCalled = true; };

    // sut(tplPath, testdest);

    // expect(beforeCalled && afterCalled).to.be.true;
  });

  // describe('copy files', function () {

  //   var path = '/tmp/foo/';

  //   beforeEach(function () {
  //     sut(testbase + 'sample_project', { destination: path }); // TODO mockfs
  //   });

  //   afterEach(function () {
  //     fsUtil.rmdir(path);
  //   });

  //   it('should copy the template files', function () {
  //     expect(fsUtil.isFile(path + 'bla.txt')).to.be.true;
  //     expect(fsUtil.isFile(path + 'sub/blubb.txt')).to.be.true;
  //   });

  //   it('should not copy control files like config.yml and index.js', function () {
  //     expect(fsUtil.isFile(path + 'config.yml')).to.be.false;
  //     expect(fsUtil.isFile(path + 'index.js')).to.be.false;
  //   });

  //   it('should copy control files in deeper directory levels', function () {
  //     expect(fsUtil.isFile(path + 'sub/index.js')).to.be.true;
  //   });

  // });

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
