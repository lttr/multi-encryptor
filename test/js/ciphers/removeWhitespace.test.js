var assert = require('assert');
var removeWhitespace = require('../../../app/js/ciphers/removeWhitespace');

describe('removeWhitespace', function() {
  it('should work', function() {
    var removeWhitespaceCipher = new removeWhitespace();
    var actual = removeWhitespaceCipher.encrypt('f o 	o');
    var expected = 'foo';
    assert.equal(actual, expected);
  });
});
