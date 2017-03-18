var assert = require('assert');
var lowercase = require('../../../app/js/ciphers/lowercase');

describe('lowercase', function() {
  it('should work', function() {
    var lowercaseCipher = new lowercase();
    var actual = lowercaseCipher.encrypt('FOO');
    var expected = 'foo';
    assert.equal(actual, expected);
  });
});
