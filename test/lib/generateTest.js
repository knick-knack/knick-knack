var fs            = require('fs'),
    cmd_generate  = require('../../lib/generate'),
    exampleFolder = process.cwd() + '/test/testdata',
    expect        = require('chai').expect;

describe('generateProject', function () {
  describe('when given an invalid template', function () {
    it('should throw an exception', function () {
      expect(cmd_generate.bind(this, '/tmp', 'yoda', true)).to.throw(Error);
    });
  });
})
