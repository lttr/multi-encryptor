var assert = require('assert');
var caesar = require('../../../app/js/ciphers/caesar');

describe('caesar', function() {
  it('should work', function() {
    var caesarCipher = new caesar();
    var actual = caesarCipher.encrypt('foo');
    var expected = 'irr';
    assert.equal(actual, expected);
  });
});
