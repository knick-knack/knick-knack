'use strict';

var codebase      = '../../lib/',
    testbase      = __dirname + '/../testdata/',
    testdest      = '/tmp/knick-knack-test',
    expect        = require('chai').expect,
    sinon         = require('sinon'),
    cmd_generate  = require(codebase + 'generate'),
    fs            = require('fs'),
    fsUtil        = require(codebase + 'util/fs');

describe.skip('command generate', function () {

  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should throw an error if no name was given in the config file', function () {
    sandbox.spy(cmd_generate, '_processFiles');
    
    expect(function() { cmd_generate(testbase + 'sample_project'); }).to.throw(Error);
  });

  it('should not require a process.js', function () {
    sandbox.spy(cmd_generate, '_processFiles');
    expect(function () {
      cmd_generate(testbase + 'general/no-process/');
    }).to.not.throw();
  });

  it('should call before and after hooks', function () {
    var beforeCalled, afterCalled;

    // var tplPath = testbase + 'general/readme/',
    //     tplProcessFile = tplPath + 'process.js',
    //     tplProcess = require(tplProcessFile);
    
    // tplProcess.before = function () { beforeCalled = true; };
    // tplProcess.after = function () { afterCalled = true; };

    // cmd_generate(tplPath, testdest);

    // expect(beforeCalled && afterCalled).to.be.true;
  });

  // describe('copy files', function () {

  //   var path = '/tmp/foo/';

  //   beforeEach(function () {
  //     cmd_generate(testbase + 'sample_project', { destination: path }); // TODO mockfs
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
