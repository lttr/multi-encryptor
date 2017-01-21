
function reverse(input) {
  return input.split('').reverse().join('');
}
var Reverse = {
  cipherName: 'Reverse',
  cipherFunction: reverse
}
CiphersList.push(Reverse);

