var Morse = function() {
  this.config = {
    enabled: true,
    charactersPerLine: 70,
    removeDiacritics: true,
    normalizeWhitespace: true
  };
};

Morse.prototype.name = 'morse';
Morse.prototype.description = 'morseDesc';
Morse.prototype.category = Categories.SUBSTITUTION;

Morse.prototype.encrypt = function(input) {
  input = Utils.removeDiacritics(input);
  input = Utils.normalizeWhitespace(input);
  input = Utils.lowercase(input);
  var inputArray = input.split('');
  var morseArray = [];
  inputArray.forEach(function(character, index) {
    var morseChar = Morse.morseHash[character] || '';
    morseArray[index] = morseChar + '|';
  });
  var outputArray = morseArray.join('').split('');
  var possibleLineBreakIndex = 0;
  var currentLineLength = 0;
  for(var i = 1; i < outputArray.length; i++) {
    currentLineLength++;
    if (outputArray[i] !== '|' && outputArray[i-1] === '|') {
      possibleLineBreakIndex = i;
    }
    if (currentLineLength >= this.config.charactersPerLine) {
      outputArray.splice(possibleLineBreakIndex, 0, '\n');
      i = possibleLineBreakIndex + 1;
      currentLineLength = 0;
    }
  }
  return outputArray.join('');
};

Morse.morseHash = Object.freeze({
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.',
  h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.',
  o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-',
  v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  ' ': '',
  '.': '|',
  '?': '|',
  '!': '|'
});

CiphersList.push(Morse);
