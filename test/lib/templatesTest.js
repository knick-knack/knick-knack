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

describe('mergeVariableLists()', function() {
  it('should return the union of both variable lists', function() {
    var list1 = [{ name: 'name' }, { name: 'user' }],
        list2 = [{ name: 'myName' }, { name: 'user' }];
        
    var result = sut.mergeVariableLists(list1, list2);
    expect(result.length).to.equal(3);
    expect(result).to.contain({ name: 'name' });
    expect(result).to.contain({ name: 'user' });
    expect(result).to.contain({ name: 'myName' });
  });
});


/*describe('extractVariablesFromFiles()', function() {
  describe('when given no noProcess field', function() {
    it('should extract all variables found in the files and folders', function() {
      var variables = sut.extractVariablesFromFiles(exampleFolder + '/python-config');
      expect(variables).to.include({ name: 'name' });
      expect(variables).to.include({ name: 'user' });
      expect(variables).to.include({ name: 'yourscript' });
      expect(variables).not.to.include({ name: 'badDelimiters' });
    });
  });
  describe('when given a noProcess field', function() {
    it('should extract all variables found in files and folders not affected by the filtering', function() {
      var noProcess = ['node_modules', '.gitignore'],
          variables = sut.extractVariablesFromFiles(exampleFolder + '/python-config', noProcess);
      expect(variables).to.include({ name: 'name' });
      expect(variables).to.include({ name: 'user' });
      expect(variables).not.to.include({ name: 'yourscript' });
    });
  });
});*/

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