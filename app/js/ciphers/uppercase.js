var Uppercase = function() {
  this.config = {};
}

Uppercase.prototype.name = 'uppercase';
Uppercase.prototype.description = 'uppercaseDesc';
Uppercase.prototype.category = Categories.UNIVERSAL;

Uppercase.prototype.encrypt = function(input) {
  return Utils.uppercase(input);
}

CiphersList.push(Uppercase);

