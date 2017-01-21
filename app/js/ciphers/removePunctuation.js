
function removePunctuation(input) {
  return S(input).latinise().stripPunctuation().s;
}
var RemovePunctuation = {
  cipherName: 'RemovePunctuation',
  cipherFunction: removePunctuation
}
CiphersList.push(RemovePunctuation);

