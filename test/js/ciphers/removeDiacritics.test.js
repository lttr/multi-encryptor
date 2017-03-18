var assert = require('assert');
var removeDiacritics = require('../../../app/js/ciphers/removeDiacritics');

describe('removeDiacritics', function() {
  it('should work', function() {
    var removeDiacriticsCipher = new removeDiacritics();
    var actual = removeDiacriticsCipher.encrypt('fóž');
    var expected = 'foz';
    assert.equal(actual, expected);
  });
});
