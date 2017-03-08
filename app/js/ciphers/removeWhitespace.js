var Categories = require('../categories');
var Utils = require('../utils');

var RemoveWhitespace = function() {
  this.config = {};
}

RemoveWhitespace.prototype.name = 'removeWhitespace';
RemoveWhitespace.prototype.description = 'removeWhitespaceDesc';
RemoveWhitespace.prototype.category = Categories.UNIVERSAL;

RemoveWhitespace.prototype.encrypt = function(input) {
  return Utils.removeWhitespace(input);
}

module.exports = RemoveWhitespace;

