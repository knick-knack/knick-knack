var cmd_list = require('../../lib/list'),
    exampleFolder = process.cwd() + '/test/testdata',
    expect = require('chai').expect;

describe('listTemplates', function () {

  describe('when no directory given', function() {
    it('should throw', function () {
      expect(function () { cmd_list(process.cwd() + '/no-directory'); }).to.throw(Error);
    });
  });

  describe('when given a directory with valid templates', function () {
    var templates = cmd_list(exampleFolder);

    it.skip('should return a list of project templates', function () {
      expect(templates.length).to.equal(4);
    });
    it('should look only one level deep', function () {
      expect(templates.indexOf('too/deep')).to.equal(-1);
    });
    it('should return only templates with config.yml', function () {
      expect(templates.indexOf('no-config')).to.equal(-1);
    });
  });
});
