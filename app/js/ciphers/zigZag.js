
function zigZag(input) {
  var array = removeWhitespace(input).split('');
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
}
var ZigZag = {
  cipherName: 'ZigZag',
  cipherFunction: zigZag
}
Ciphers.push(ZigZag);

