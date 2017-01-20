
function removePunctuation(input) {
  return S(input).latinise().stripPunctuation().s;
}
var RemovePunctuation = {
  cipherName: 'RemovePunctuation',
  cipherFunction: removePunctuation
}
Ciphers.push(RemovePunctuation);

