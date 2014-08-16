var fs            = require('fs'),
    sut           = require('../../lib/generate'),
    exampleFolder = process.cwd() + '/spec/testdata';

describe('createProject', function() {
  describe('when given a valid template', function() {
    it('should create a new folder with the name of the project', function() {
      sut.createProject(exampleFolder, 'python/fabric', true);
      var testFolder = process.cwd() + '/projects/test-project';
      fs.existsSync(testFolder).should.be.true;
      //TODO remove testFolder
    });
    
    it('copy all files to the new folder', function() {
      true.should.be.true;
    });
    
    it('replace variables in the source files with the chosen values', function() {
      true.should.be.true;
    });
  });
  
  describe('when given an invalid template', function() {
    it('should throw an exception', function() {
      (function () {
        sut.createProject('/tmp', 'yoda', true);
      }).should.throw(Error);
    });
  });
})