var assert = require('assert');
var removePunctuation = require('../../../app/js/ciphers/removePunctuation');

describe('removePunctuation', function() {
  it('should work', function() {
    var removePunctuationCipher = new removePunctuation();
    var actual = removePunctuationCipher.encrypt('f?o.o');
    var expected = 'foo';
    assert.equal(actual, expected);
  });
});
