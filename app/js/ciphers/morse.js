
var MorseHash = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.',
  h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.',
  o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-',
  v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  ' ': '',
  '.': '|',
  '?': '|',
  '!': '|'
}
function morse(input) {
  var charactersPerLine = 70;
  var cleanInput = removeDiacritics(input);
  cleanInput = cleanInput.trim()
                        .toLocaleLowerCase()
                        .replace(/\s+/g,' ');
  var inputArray = cleanInput.split('');
  var morseArray = [];
  inputArray.forEach(function(character, index) {
    var morseChar = MorseHash[character] || '';
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
    if (currentLineLength >= charactersPerLine) {
      outputArray.splice(possibleLineBreakIndex, 0, '\n');
      i = possibleLineBreakIndex + 1;
      currentLineLength = 0;
    }
  }
  return outputArray.join('');
}
var Morse = {
  cipherName: 'Morse',
  cipherFunction: morse
}
Ciphers.push(Morse);

