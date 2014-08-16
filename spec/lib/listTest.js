var sut = require('../../lib/list'),
    exampleFolder = process.cwd() + '/spec/testdata';

describe('listProjects', function() {
  describe('when given a folder without any templates', function() {
    it('should return an empty list', function() {
      sut.listProjects('/tmp').should.be.empty;
    });
  });
  
  describe('when given a folder with valid templates', function() {
    it('should return a list of the names of the project templates', function() {
      var result = sut.listProjects(exampleFolder);
      result.length.should.equal(2);
      result[0].should.equal('python/fabric: Create a Fabric project.');
      result[1].should.equal('sample_project: Create a sample project.');
    });
  });
})