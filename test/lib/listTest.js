var sut = require('../../lib/list'),
    exampleFolder = process.cwd() + '/test/testdata',
    expect = require('chai').expect;

describe('listTemplates', function () {

  describe('when no directory given', function() {
    it('should throw', function () {
      expect(function () { sut.listTemplates(process.cwd() + '/no-directory'); }).to.throw(Error);
    });
  });

  describe('when given a directory with valid templates', function () {
    var list = sut.listTemplates(exampleFolder);

    it('should return a list of project templates', function () {
      expect(list.length).to.equal(4);
    });
    it('should look only one level deep', function () {
      expect(list.indexOf('too-deep')).to.equal(-1);
    });
    it('should return only templates with config.yml', function () {
      expect(list.indexOf('no-config')).to.equal(-1);
    });
  });
});
