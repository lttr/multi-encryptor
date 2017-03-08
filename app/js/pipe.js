module.exports = function(number, ciphers) {
  this.number = number || 1;
  this.chosenCiphers = ciphers;
  this.searchText = null;
  this.selectedCipher = null;
  this.addCipher = function(cipher) {
    this.chosenCiphers.push(cipher);
  };
  this.getNumber = function() {
    return this.number;
  };
}
