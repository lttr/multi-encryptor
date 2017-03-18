var assert = require('assert');
var zigZag = require('../../../app/js/ciphers/zigZag');

describe('zigZag', function() {
  it('should work', function() {
    var zigZagCipher = new zigZag();
    var actual = zigZagCipher.encrypt('foo');
    var expected = 'f o \no ';
    assert.equal(actual, expected);
  });
});
