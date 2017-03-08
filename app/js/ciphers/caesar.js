var Categories = require('../categories');
var Utils = require('../utils');

var Caesar = function() {
  this.config = {
    enabled: true,
    removePunctuation: true,
    removeDiacritics: true,
    normalizeWhitespace: true,
    shift: 3
  };
}

Caesar.prototype.name = 'caesar';
Caesar.prototype.description = 'caesarDesc';
Caesar.prototype.category = Categories.SUBSTITUTION;

Caesar.prototype.encrypt = function(input) {
  input = Utils.removePunctuation(input);
  input = Utils.removeDiacritics(input);
  input = Utils.normalizeWhitespace(input);
  var array = input.split('');
  var outputArray = [];
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === ' ') {
      outputArray[i] = ' ';
    } else {
      outputArray[i] = Utils.adjacent(array[i], this.config.shift);
    }
  }
  return outputArray.join('');
}

module.exports = Caesar;
