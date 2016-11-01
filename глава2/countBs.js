var str = "This is a test string with some Beans in it and some more Beans";
var count = 0;
function countChar(str, char) {
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == char) count++;
  }
  return count;
}

countChar(str, 't');

console.log(count);
