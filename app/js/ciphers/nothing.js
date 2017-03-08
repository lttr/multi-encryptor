var Categories = require('../categories');

var Nothing = function() {
  this.config = {};
}

Nothing.prototype.name = 'nothing';
Nothing.prototype.description = 'nothingDesc';
Nothing.prototype.category = Categories.UNIVERSAL;

Nothing.prototype.encrypt = function(input) {
  return input;
}

module.exports = Nothing;

