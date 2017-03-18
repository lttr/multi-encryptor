var assert = require('assert');
var uppercase = require('../../../app/js/ciphers/uppercase');

describe('uppercase', function() {
  it('should work', function() {
    var uppercaseCipher = new uppercase();
    var actual = uppercaseCipher.encrypt('foo');
    var expected = 'FOO';
    assert.equal(actual, expected);
  });
});
