var Categories = require('../categories');
var Utils = require('../utils');

var RemoveDiacritics = function() {
  this.config = {};
}

RemoveDiacritics.prototype.name = 'removeDiacritics';
RemoveDiacritics.prototype.description = 'removeDiacriticsDesc';
RemoveDiacritics.prototype.category = Categories.UNIVERSAL;

RemoveDiacritics.prototype.encrypt = function(input) {
  return Utils.removeDiacritics(input);
}

module.exports = RemoveDiacritics;
