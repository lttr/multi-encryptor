var ZigZag = function() {
  this.config = {
    start: 'top',
    rows: 2
  };
}

ZigZag.prototype.name = 'zigZag';
ZigZag.prototype.description = 'zigZagDesc';
ZigZag.prototype.category = Categories.TRANSPOSITION;

ZigZag.prototype.encrypt = function(input) {
  var inputArray = Utils.removeWhitespace(input).split('');
  var rows = this.config.rows;
  var columns = Math.ceil(inputArray.length / rows);

  var outputArray = new Array(rows);
  for (var i = 0; i < outputArray.length; i++) {
    outputArray[i] = new Array(columns);
  }
  console.log(outputArray);


  var firstLine = '';
  var secondLine = '';
  for (var i = 0; i < inputArray.length; i++) {
    if (i % rows == 0) {
      firstLine += inputArray[i] + ' ';
    } else {
      secondLine += inputArray[i] + ' ';
    }
  }
  var result = '';
  if (this.config.start === 'top') {
    result = firstLine + '\n' + secondLine;
  } else if (this.config.start === 'bottom') {
    result = secondLine + '\n' + firstLine;
  }
  return result;
};

CiphersList.push(ZigZag);

