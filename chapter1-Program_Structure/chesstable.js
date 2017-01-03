var height = 15;
var width = 15;

for (y = 0;y < height; y++) {
  var str = '';
  if (y % 2 == 0) {
    for (x = 0; x < width; x++) {
      if (x % 2 == 0) str = str + ' ';
       else  str = str + '#';
    }
  } else {
    for (x = 0; x < width; x++) {
      if (x % 2 == 0) str = str + '#';
       else str = str + ' ';
    }
  }
  console.log(str);
}
