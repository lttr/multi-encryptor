var S = require('string');

var Alphabet = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y',
  'z'
];

var adjacent = function(char, shift) {
  var alphabet = [];
  for (var i = 0, l = Alphabet.length; i < l; i++) {
    if (isUpper(char)) {
      alphabet[i] = Alphabet[i].toUpperCase();
    } else {
      alphabet[i] = Alphabet[i];
    }
  }
  if (shift === 0) {
    return char;
  }
  var index = alphabet.indexOf(char);
  var newIndex;
  if (index > -1) {
    if (shift < 0) {
      newIndex = index + shift;
      if (newIndex <= 0) {
        newIndex = (alphabet.length - 1) + newIndex;
      }
    } else { // shift > 0
      newIndex = (index + shift) % (alphabet.length - 1);
    }
  } else {
    return '?';
  }
  return alphabet[newIndex];
}

var isLower = function(char) {
  return S(char).latinise().isLower();
}

var isUpper = function(char) {
  return S(char).latinise().isUpper();
}

var lowercase = function(input) {
  return input.toLocaleLowerCase();
}

var normalizeWhitespace = function(input) {
  return input.replace(/\s+/g,' ');
}

var removeDiacritics = function(input) {
  return S(input).latinise().s;
}

var removeWhitespace = function(input) {
  return input.replace(/\s*/g,'');
}

var removePunctuation = function(input) {
  return S(input).stripPunctuation().s;
}

var reverse = function(input) {
  return input.split('').reverse().join('');
}

var uppercase = function(input) {
  return input.toLocaleUpperCase();
}

module.exports = {
  Alphabet: Alphabet,
  adjacent: adjacent,
  isLower: isLower,
  isUpper: isUpper,
  lowercase: lowercase,
  normalizeWhitespace: normalizeWhitespace,
  removeDiacritics: removeDiacritics,
  removeWhitespace: removeWhitespace,
  removePunctuation: removePunctuation,
  reverse: reverse,
  uppercase: uppercase
}

