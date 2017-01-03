function reverseArray(array) {
  var array_reversed = [];
  for (i = array.length-1; i >= 0; i--) {
    array_reversed.push(array[i]);
  }
  return array_reversed;
}

function reverseArrayInPlace(array) {
  var a = 0;
  for (i = 0; i < array.length/2; i++) {
    a = array[array.length-i - 1];
    array[array.length - i - 1] = array[i];
    array[i] = a;
  }
  return array;
}
console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33]));
