var Categories = require('../categories');
var Utils = require('../utils');

var Lowercase = function() {
  this.config = {};
}

Lowercase.prototype.name = 'lowercase';
Lowercase.prototype.description = 'lowercaseDesc';
Lowercase.prototype.category = Categories.UNIVERSAL;

Lowercase.prototype.encrypt = function(input) {
  return Utils.lowercase(input);
}

module.exports = Lowercase;
