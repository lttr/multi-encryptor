var assert = require('assert');
var Nothing = require('../../../app/js/ciphers/nothing');

describe('Nothing', function() {
  it('should return the same string', function() {
    nothing = new Nothing();
    assert.equal("foo", nothing.encrypt("foo"));
  });
});






