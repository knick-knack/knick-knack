var sut = require('../../../lib/util/text');

// describe('getMostNestedFolder', function() {
//   describe('when given a relative path', function() {
//     it('should simply return the input', function() {
//       sut.getMostNestedFolder('example').should.equal('example');
//     });
//   });

//   describe('when given an absolute path', function() {
//     it('should return the last part of the path', function() {
//       sut.getMostNestedFolder('/etc/init.d/myFolder').should.equal('myFolder');
//     });

//     it('should work with single folder paths', function() {
//       sut.getMostNestedFolder('/etc').should.equal('etc');
//     });

//     it('should return an empty string if the last character is a slash', function() {
//       sut.getMostNestedFolder('/etc/').should.equal('');
//     });

//     it('should work with windows style slashes', function() {
//       sut.getMostNestedFolder('c:\\temp\\myFolder').should.equal('myFolder');
//     });
//   });
// })
