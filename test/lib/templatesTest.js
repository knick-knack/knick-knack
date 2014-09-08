var expect        = require('chai').expect,
    sut           = require('../../lib/template'),
    exampleFolder = process.cwd() + '/test/testdata';

describe('isValidProjectTemplate', function() {
  describe('when given a valid project folder', function() {
    it('should return true', function() {
      expect(sut.isValidProjectTemplate(exampleFolder + '/python-fabric')).to.be.true;
    });
  });

  describe('when given an invalid project folder', function() {
    it('should return false for invalid folders', function() {
      expect(sut.isValidProjectTemplate(exampleFolder + '/invalid')).to.be.false;
      expect(sut.isValidProjectTemplate(exampleFolder)).to.be.false;
    });
  });
});

describe('readDescription()', function() {
  it('should output the description from the config file', function() {
    expect(sut.readDescription(exampleFolder + '/python-fabric')).to.equal('Create a Fabric project.');
  });
});

describe('readConfigFile()', function() {
  it('should read the config file and return the content as an object', function() {
    var config = sut.readConfigFile(exampleFolder + '/python-fabric');
    expect(config).to.be.ok;
    expect(config.description).to.equal('Create a Fabric project.');
    expect(config.partials[0]).to.equal('general/readme');
    expect(config.partials[1]).to.equal('python/config');
    expect(config.variables.name).to.equal('test-project');
  });
});
