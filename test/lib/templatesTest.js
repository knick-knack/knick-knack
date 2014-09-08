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
    expect(config.partials).to.include('general/readme');
    expect(config.partials).to.include('python/config');
    expect(config.variables.name).to.equal('test-project');
  });
});

describe('convertConfigVariables()', function() {
  it('should convert config style variables to processable ones', function() {
    var configVars = [{
      myConfigVar: { default: 'def', ask: 'What def?' }
    }, {
      projectType: { default: 'maven', options: ['maven', 'grunt', 'gradle'] }
    }];
    
    var result = sut.convertConfigVariables(configVars);
    
    expect(result).to.contain({
      name: 'myConfigVar',
      default: 'def',
      ask: 'What def?'
    });
    expect(result).to.contain({
      name: 'projectType',
      default: 'maven',
      options: ['maven', 'grunt', 'gradle']
    });
  });
});

// describe('getRequiredVariables()', function() {
//   describe('when reading a template without partials', function() {
//     it('should gather all variables used in the template', function() {
//       var result = sut.getRequiredVariables(exampleFolder, exampleFolder + '/python-config');
//       expect(result).not.to.be.empty;
//       expect(result).to.include({
//         name: 'user'
//       });
//       expect(result).not.to.include({
//         name: 'yourscript'
//       });
//     });
    
//     it('should add all variables used in the config files', function() {
//       var result = sut.getRequiredVariables(exampleFolder, exampleFolder + '/python-config');
//       expect(result).not.to.be.empty;
//       expect(result).to.include({
//         name: 'name',
//         default: 'Sample'
//       });
//       expect(result).to.include({
//         name: 'gitlabGroup',
//         default: 'onetwothree',
//         ask: 'Name please?'
//       });
//       expect(result).to.include({
//         name: 'projectType',
//         default: 'maven',
//         options: ['maven', 'grunt', 'gradle']
//       });
//     });
//   });
// });