
module.exports = function() {
  return [
    require('./ciphers/caesar'),
    require('./ciphers/lowercase'),
    require('./ciphers/morse'),
    require('./ciphers/nothing'),
    require('./ciphers/removeDiacritics'),
    require('./ciphers/removePunctuation'),
    require('./ciphers/removeWhitespace'),
    require('./ciphers/reverse'),
    require('./ciphers/uppercase'),
    require('./ciphers/zigZag')
  ];
}

