var Categories = require('../categories');
var Utils = require('../utils');

var RemovePunctuation = function() {
  this.config = {};
}

RemovePunctuation.prototype.name = 'removePunctuation';
RemovePunctuation.prototype.description = 'removePunctuationDesc';
RemovePunctuation.prototype.category = Categories.UNIVERSAL;

RemovePunctuation.prototype.encrypt = function(input) {
  return Utils.removePunctuation(input);
};

module.exports = RemovePunctuation;

