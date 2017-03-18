var assert = require('assert');
var morse = require('../../../app/js/ciphers/morse');

describe('morse', function() {
  it('should work', function() {
    var morseCipher = new morse();
    var actual = morseCipher.encrypt('foo');
    var expected = '..-.|---|---|';
    assert.equal(actual, expected);
  });
});
