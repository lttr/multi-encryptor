var ZigZag = function() {
  this.config = {};
}

ZigZag.prototype.name = 'zigZag';
ZigZag.prototype.description = 'zigZagDesc';
ZigZag.prototype.category = Categories.TRANSPOSITION;

ZigZag.prototype.encrypt = function(input) {
  var array = Utils.removeWhitespace(input).split('');
  var firstLine = '';
  var secondLine = '';
  for (var i = 0, l = array.length; i < l; i++) {
    if (i % 2 == 0) {
      firstLine += array[i] + ' ';
    } else {
      secondLine += array[i] + ' ';
    }
  }
  return firstLine + '\n' + secondLine;
};

CiphersList.push(ZigZag);

