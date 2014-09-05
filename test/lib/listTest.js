var sut = require('../../lib/list'),
    expect = require('chai').expect;

describe('listTemplates', function() {
  describe('when no folder given', function() {
    it('should throw', function() {
      expect(function() { sut.listTemplates(process.cwd() + '/no-folder'); }).to.throw(Error);
    });
  });

  describe('when given a folder with valid templates', function() {
    it('should return a list of the names of the project templates', function() {
      var result = sut.listTemplates(process.cwd() + '/test/testdata/');
      expect(result.length).to.equal(3);
      expect(result.indexOf('python-fabric: Create a Fabric project.')).to.not.equal(-1);
    });
  });
})
