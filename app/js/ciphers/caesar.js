
function caesar(input) {
  var shift = 3;
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
var Caesar = {
  cipherName: 'Caesar',
  cipherFunction: caesar
}
Ciphers.push(Caesar);

