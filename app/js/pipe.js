var Pipe = function(number, ciphers) {
  this.number = number || 1;
  this.chosenCiphers = ciphers;
  this.searchText = null;
  this.selectedCipher = null;
  this.getName = function() {
    return 'Pipe ' + this.number;
  };
}

