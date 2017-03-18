var assert = require('assert');
var nothing = require('../../../app/js/ciphers/nothing');

describe('nothing', function() {
  it('should work', function() {
    var nothingCipher = new nothing();
    var actual = nothingCipher.encrypt('foo');
    var expected = 'foo';
    assert.equal(actual, expected);
  });
});
