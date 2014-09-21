'use strict';

var template = require('../../lib/template'),
    testbase = __dirname + '/../testdata/',
    expect   = require('chai').expect;

describe('template()', function () {

  it('should throw if no template was given', function () {
    expect(function () {
      template(testbase);
    }).to.throw(Error);
  });

  it('should return a template object with path and description', function () {
    var path = testbase + 'sample_project';
    var res = template(path);
    expect(res).to.be.ok;
    expect(res.path).to.equal(path);
    expect(typeof res.description).to.equal('string');
  });

  it('should add the before and after hooks to the template object', function () {
    var res = template(testbase + 'sample_project');
    expect(typeof res.before).to.equal('function');
    expect(res.before.toString().indexOf('dummyBefore') !== -1).to.be.true;
  });

  it('should add callback noops if no hooks were defined', function () {
    var res = template(testbase + 'general/readme');
    expect(typeof res.before).to.equal('function');
    expect(res.before.toString().indexOf('noop') !== -1).to.be.true;

    var wasCalled;
    res.before(res, function () {
      wasCalled = true;
    });

    expect(wasCalled).to.be.true; // TODO async
  });

});
