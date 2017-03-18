var assert = require('assert');
var reverse = require('../../../app/js/ciphers/reverse');

describe('reverse', function() {
  it('should work', function() {
    var reverseCipher = new reverse();
    var actual = reverseCipher.encrypt('foo');
    var expected = 'oof';
    assert.equal(actual, expected);
  });
});
