var nothing = require('../../../app/js/ciphers/nothing');
var assert = require('assert');
describe('NothingC', function() {
  it('should return the same string', function() {
    assert.equal("foo", nothing("foo"));
  });
});






