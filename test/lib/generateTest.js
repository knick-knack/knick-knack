var codebase      = '../../lib/',
    testbase      = __dirname + '/../testdata/',
    expect        = require('chai').expect,
    cmd_generate  = require(codebase + 'generate'),
    fs            = require('fs'),
    fsUtil        = require(codebase + 'util/fs');

describe('command generate', function () {

  it('should throw an error if no name was given', function () {
    expect(function() { cmd_generate(testbase + 'sample_project'); }).to.throw(Error);
  });

  // it('should call before and after hooks', function () {
  //   var beforeCalled, afterCalled;

  //   cmd_generate({
  //     before: function () { beforeCalled = true; },
  //     after:  function () { afterCalled  = true; }
  //   }, { destination: '/tmp/foo' });

  //   expect(beforeCalled && afterCalled).to.be.true;
  // });

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
