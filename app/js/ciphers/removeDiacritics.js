
function removeDiacritics(input) {
  return S(input).latinise().s;
}
var RemoveDiacritics = {
  cipherName: 'RemoveDiacritics',
  cipherFunction: removeDiacritics
}
Ciphers.push(RemoveDiacritics);

