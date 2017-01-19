'use strict';

angular
  .module('encrypter', [
    'ngMessages',
    'ngMaterial',
    'ngAnimate',
    'pascalprecht.translate'
  ])
  .controller('EncrypterController', EncrypterController)
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('brown')
      .accentPalette('amber')
      .warnPalette('deep-orange');
  })
  .config(function($translateProvider) {
    $translateProvider
      .translations('en', {
        multiEncryptor: 'Multi encrypter'
      })
      .translations('cs', {
        multiEncryptor: 'Multi šifrovač'
      });
    $translateProvider.determinePreferredLanguage();
    $translateProvider.useStaticFilesLoader({
        prefix: '/js/lang/',
        suffix: '.json'
      });
    $translateProvider.useLocalStorage();
  });

var Pipe = function(number, ciphers) {
  this.number = number || 1;
  this.chosenCiphers = ciphers;
  this.searchText = null;
  this.selectedCipher = null;
  this.getName = function() {
    return 'Pipe ' + this.number;
  };
}

function EncrypterController($scope, $mdSidenav, $translate) {
  var self = this;

	self.ciphers = Ciphers;
  self.input = 'P.říliš žluťoučký\tkůň\npěl ďábelské ódy!';

  var defaultPipe = new Pipe(1, [Morse]);
  var defaultPipe2 = new Pipe(1, [Morse]);
  self.pipes = [defaultPipe, defaultPipe2];

  self.changeLanguage = changeLanguage;

  self.querySearch = querySearch;
  self.createFilterFor = createFilterFor;
  self.addPipe = addPipe;
  self.removePipe = removePipe;
  self.getOutput = getOutput;

  self.openSettingsOnSide = function() {
    $mdSidenav('settingsOnSide').toggle();
  };

  function changeLanguage(langKey) {
    $translate.use(langKey)
  }

  function addPipe() {
    var number = self.pipes.length + 1;
    var pipe = new Pipe(number, []);
    self.pipes.push(pipe);
  }

  function removePipe(pipe) {
    var index = self.pipes.indexOf(pipe);
    self.pipes.splice(index, 1);
  }

  function querySearch(query) {
    var results = query ? self.ciphers.filter(createFilterFor(query)) : [];
    return results;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(item) {
      return (angular.lowercase(item.cipherName).indexOf(lowercaseQuery) === 0);
    };
  }

  function getOutput(pipe) {
    var thisInput = self.input;
    if (!thisInput) {
      thisInput = '';
    }
    var result = pipe.chosenCiphers.reduce(
      function(output, cipher) {
        return cipher.cipherFunction(output);
    }, thisInput);
    return result;
  };
}



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
