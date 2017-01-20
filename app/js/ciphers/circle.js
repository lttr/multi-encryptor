
function circle(input) {
  var array = removeWhitespace(input).split('').reverse();
  var len = array.length;
  var side = 1;
  while (side*side < len) {
    side++;
  }
  var Point = {
    x: 0,
    y: 0
  };
  outputArray = [];
  for (var i = 0; i < side; i++) {
    outputArray[i] = [];
    for (var j = 0; j < side; j++) {
      outputArray[i][j] = '';
    }
  }
  for (var i = 0, l = array.length; i < l; i++) {
    outputArray[Point.x] = [];
    outputArray[Point.x][Point.y] = array[i];
    Point = nextPoint(outputArray, Point);
  }
  return outputArray.join('\n').replace(/,/g, ' ');
}
function nextPoint(outputArray, Point) {
  while (outputArray[Point.x][Point.y] === undefined) {
    Point.x--;
  }
  return Point;
}
// var Circle = {
//   cipherName: 'Circle',
//   cipherFunction: circle
// }
// Ciphers.push(Circle);

