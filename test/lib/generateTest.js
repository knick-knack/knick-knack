var fs            = require('fs'),
    sut           = require('../../lib/generate'),
    exampleFolder = process.cwd() + '/test/testdata',
    expect        = require('chai').expect;

describe('generateProject', function () {
  describe('when given an invalid template', function () {
    it('should throw an exception', function () {
      expect(sut.generateProject.bind(this, '/tmp', 'yoda', true)).to.throw(Error);
    });
  });
})
