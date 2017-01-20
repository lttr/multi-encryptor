
function shift(input) {
  var shift = -1;
  var cleanInput = removeDiacritics(removePunctuation(input));
  var array = cleanInput.trim().replace(/\s+/g,' ').split('');
  var outputArray = [];
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === ' ') {
      outputArray[i] = ' ';
    } else {
      outputArray[i] = adjacent(array[i], shift);
    }
  }
  return outputArray.join('');
}
var Shift = {
  cipherName: 'Shift',
  cipherFunction: shift
}
Ciphers.push(Shift);


