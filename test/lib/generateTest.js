var fs            = require('fs'),
    sut           = require('../../lib/generate'),
    exampleFolder = process.cwd() + '/test/testdata',
    expect        = require('chai').expect;

describe('createProject', function() {
  describe('when given a valid template', function() {
    // it('should create a new folder with the name of the project', function() {
    //   var testFolder = process.cwd() + '/test-project';
    //   expect(fs.existsSync(testFolder)).to.be.false;
      
    //   sut.createProject(exampleFolder, 'python-fabric', true);
    //   expect(fs.existsSync(testFolder)).to.be.true;
    //   console.log('TODO: remove', testFolder);
    //   //fs.rmdirSync(testFolder);
    // });
    
    it('copy all files to the new folder');
    
    it('replace variables in the source files with the chosen values');
  });
  
  describe('when given an invalid template', function() {
    it('should throw an exception', function() {
      expect(sut.createProject.bind(this, '/tmp', 'yoda', true)).to.throw(Error);
    });
  });
})