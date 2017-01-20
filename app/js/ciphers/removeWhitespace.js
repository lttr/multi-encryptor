
function removeWhitespace(input) {
  return input.replace(/\s*/g,'');
}
var RemoveWhitespace = {
  cipherName: 'RemoveWhitespace',
  cipherFunction: removeWhitespace
}
Ciphers.push(RemoveWhitespace)

