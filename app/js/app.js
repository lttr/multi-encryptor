'use strict';

function EncrypterController($scope, $mdSidenav) {
  $scope.openSettingsOnSide = function() {
    $mdSidenav('settingsOnSide').toggle();
  };

  this.input = 'Příliš žluťoučký\tkůň\npěl ďábelské ódy!';

  this.getOutputs = function() {
    var thisInput = this.input;
    if (!thisInput) {
      thisInput = '';
    }
    var outputs = [];
    Ciphers.forEach(function(cipher) {
      cipher.output = cipher.cipherFunction(thisInput)
      outputs.push(cipher);
    });
    return outputs;
  };
}

angular
  .module('encrypter', ['ngMessages','ngMaterial'])
  .controller('EncrypterController', EncrypterController)
  .config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  });


//
// FUNCTIONS
//

var Ciphers = [];

function nothing(input) {
  return input;
}
var Nothing = {
  cipherName: 'Nothing',
  cipherFunction: nothing
}
Ciphers.push(Nothing);

function reverse(input) {
  return input.split('').reverse().join('');
}
var Reverse = {
  cipherName: 'Reverse',
  cipherFunction: reverse
}
Ciphers.push(Reverse);

function removeDiacritics(input) {
  return S(input).latinise().s;
}
var RemoveDiacritics = {
  cipherName: 'RemoveDiacritics',
  cipherFunction: removeDiacritics
}
Ciphers.push(RemoveDiacritics);

function removePunctuation(input) {
  return S(input).latinise().stripPunctuation().s;
}
var RemovePunctuation = {
  cipherName: 'RemovePunctuation',
  cipherFunction: removePunctuation
}
Ciphers.push(RemovePunctuation);

function removeWhitespace(input) {
  return input.replace(/\s*/g,'');
}
var RemoveWhitespace = {
  cipherName: 'RemoveWhitespace',
  cipherFunction: removeWhitespace
}
Ciphers.push(RemoveWhitespace)

function circle(input) {
  var array = removeWhitespace(input).split('').reverse();
  var len = array.length;
  var side = 1;
  while (side*side < len) {
    side++;
  }
  var Point = {
    x: 0,
    y: 0
  };
  outputArray = [];
  for (var i = 0; i < side; i++) {
    outputArray[i] = [];
    for (var j = 0; j < side; j++) {
      outputArray[i][j] = '';
    }
  }
  for (var i = 0, l = array.length; i < l; i++) {
    outputArray[Point.x] = [];
    outputArray[Point.x][Point.y] = array[i];
    Point = nextPoint(outputArray, Point);
  }
  return outputArray.join('\n').replace(/,/g, ' ');
}
function nextPoint(outputArray, Point) {
  while (outputArray[Point.x][Point.y] === undefined) {
    Point.x--;
  }
  return Point;
}
// var Circle = {
//   cipherName: 'Circle',
//   cipherFunction: circle
// }
// Ciphers.push(Circle);

function zigZag(input) {
  var array = removeWhitespace(input).split('');
  var firstLine = '';
  var secondLine = '';
  for (var i = 0, l = array.length; i < l; i++) {
    if (i % 2 == 0) {
      firstLine += array[i] + ' ';
    } else {
      secondLine += array[i] + ' ';
    }
  }
  return firstLine + '\n' + secondLine;
}
var ZigZag = {
  cipherName: 'ZigZag',
  cipherFunction: zigZag
}
Ciphers.push(ZigZag);

var MorseHash = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.',
  h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.',
  o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-',
  v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..'
}
function morse(input) {
  var cleanInput = removeDiacritics(removePunctuation(input));
  var array = cleanInput.trim()
                        .toLocaleLowerCase()
                        .replace(/\s+/g,' ')
                        .split('');
  var outputArray = [];
  for (var i = 0, l = array.length; i < l; i++) {
    outputArray[i] = MorseHash[array[i]];
  }
  return outputArray.join('|') + '|||';
}
var Morse = {
  cipherName: 'Morse',
  cipherFunction: morse
}
Ciphers.push(Morse);

function caesar(input) {
  var shift = 3;
  var cleanInput = removeDiacritics(removePunctuation(input));
  var array = cleanInput.trim().replace(/\s+/g,' ').split('');
  var outputArray = [];
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === ' ') {
      outputArray[i] = ' ';
    } else {
      outputArray[i] = adjacent(array[i], shift);
    }
  }
  return outputArray.join('');
}
var Caesar = {
  cipherName: 'Caesar',
  cipherFunction: caesar
}
Ciphers.push(Caesar);

function shift(input) {
  var shift = -1;
  var cleanInput = removeDiacritics(removePunctuation(input));
  var array = cleanInput.trim().replace(/\s+/g,' ').split('');
  var outputArray = [];
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === ' ') {
      outputArray[i] = ' ';
    } else {
      outputArray[i] = adjacent(array[i], shift);
    }
  }
  return outputArray.join('');
}
var Shift = {
  cipherName: 'Shift',
  cipherFunction: shift
}
Ciphers.push(Shift);


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
