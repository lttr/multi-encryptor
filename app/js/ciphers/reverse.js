var Reverse = function() {
  this.config = {};
}

Reverse.prototype.name = 'reverse';
Reverse.prototype.description = 'reverseDesc';
Reverse.prototype.category = Categories.TRANSPOSITION;

Reverse.prototype.encrypt = function(input) {
  return Utils.reverse(input);
}

CiphersList.push(Reverse);

