

var Alphabet = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y',
  'z'
];
function adjacent(char, shift) {
  var alphabet = [];
  for (var i = 0, l = Alphabet.length; i < l; i++) {
    if (S(char).isUpper()) {
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
};
