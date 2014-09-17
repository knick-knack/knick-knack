var expect        = require('chai').expect,
    fs            = require('fs'),
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
    expect(config.partials).to.include('general/readme');
    expect(config.partials).to.include('python/config');
    expect(config.variables.name).to.equal('test-project');
  });
});

describe('extractVariables()', function() {
  it('should return the correct variables for test file 1', function() {
    var file = fs.readFileSync(exampleFolder + '/python-config/files/config-dev.yml', 'utf8');
    var vars = sut.extractVariables(file);
    expect(Object.keys(vars).length).to.equal(2);
    expect(vars.name).to.exist;
    expect(vars.user).to.exist;
  });
  
  it('should return the correct variables for test file 2', function() {
    var file = fs.readFileSync(exampleFolder + '/python-config/files/config-prod.yml', 'utf8');
    var vars = sut.extractVariables(file);
    expect(Object.keys(vars).length).to.equal(1);
    expect(vars.name).to.exist;
  });
});

describe('extractVariablesFromFiles()', function() {
  describe('when given no noProcess field', function() {
    it('should extract all variables found in the files and folders', function() {
      var vars = sut.extractVariablesFromFiles(exampleFolder + '/python-config');
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
          vars = sut.extractVariablesFromFiles(exampleFolder + '/python-config', noProcess);
      expect(vars.name).to.exist;
      expect(vars.user).to.exist;
      expect(vars.yourscript).to.not.exist;
    });
    
    it('should extract all variables found in files and folders filtered using wildcards', function() {
      var noProcess = ['*modules*'],
          vars = sut.extractVariablesFromFiles(exampleFolder + '/python-config', noProcess);
      expect(vars.name).to.exist;
      expect(vars.user).to.exist;
      expect(vars.yourscript).to.not.exist;
    });
    
    it('should extract all variables found in files and folders filtered using wildcards', function() {
      var noProcess = ['config*'],
          vars = sut.extractVariablesFromFiles(exampleFolder + '/python-config', noProcess);
      expect(vars.name).to.not.exist;
      expect(vars.user).to.not.exist;
      expect(vars.yourscript).to.exist;
    });
  });
});