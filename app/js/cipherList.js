
module.exports = function() {
  return [
    require('./ciphers/caesar.js'),
    require('./ciphers/lowercase.js'),
    require('./ciphers/morse.js'),
    require('./ciphers/nothing.js'),
    require('./ciphers/removeDiacritics.js'),
    require('./ciphers/removePunctuation.js'),
    require('./ciphers/removeWhitespace.js'),
    require('./ciphers/reverse.js'),
    require('./ciphers/uppercase.js'),
    require('./ciphers/zigZag.js')
  ];
}

