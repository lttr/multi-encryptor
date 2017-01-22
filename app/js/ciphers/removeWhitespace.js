var RemoveWhitespace = function() {
  this.config = {};
}

RemoveWhitespace.prototype.name = 'removeWhitespace';
RemoveWhitespace.prototype.description = 'removeWhitespaceDesc';
RemoveWhitespace.prototype.category = Categories.UNIVERSAL;

RemoveWhitespace.prototype.encrypt = function(input) {
  return Utils.removeWhitespace(input);
}

CiphersList.push(RemoveWhitespace);

