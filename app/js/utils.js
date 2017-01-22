var Utils = {

  Alphabet: [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z'
  ],

  adjacent: function(char, shift) {
    var alphabet = [];
    for (var i = 0, l = Utils.Alphabet.length; i < l; i++) {
      if (Utils.isUpper(char)) {
        alphabet[i] = Utils.Alphabet[i].toUpperCase();
      } else {
        alphabet[i] = Utils.Alphabet[i];
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
  },

  isLower: function(char) {
    return S(char).latinise().isLower();
  },

  isUpper: function(char) {
    return S(char).latinise().isUpper();
  },

  lowercase: function(input) {
    return input.toLocaleLowerCase();
  },

  normalizeWhitespace: function(input) {
    return input.replace(/\s+/g,' ');
  },

  removeDiacritics: function(input) {
    return S(input).latinise().s;
  },

  removeWhitespace: function(input) {
    return input.replace(/\s*/g,'');
  },

  removePunctuation: function(input) {
    return S(input).latinise().stripPunctuation().s;
  },

  reverse: function(input) {
    return input.split('').reverse().join('');
  },

  uppercase: function(input) {
    return input.toLocaleUpperCase();
  },

};

