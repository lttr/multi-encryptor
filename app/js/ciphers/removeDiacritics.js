var RemoveDiacritics = function() {
  this.config = {};
}

RemoveDiacritics.prototype.name = 'removeDiacritics';
RemoveDiacritics.prototype.description = 'removeDiacriticsDesc';
RemoveDiacritics.prototype.category = Categories.UNIVERSAL;

RemoveDiacritics.prototype.encrypt = function(input) {
  return Utils.removeDiacritics(input);
}

CiphersList.push(RemoveDiacritics);
