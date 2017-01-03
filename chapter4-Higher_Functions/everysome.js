function every(array, test) {
  count = 0;
  for (var element in array) {
    if ((test(array[element]) == false)) count++;
  }
  if (count != 0) return false;
  else return true;
}

function some(array, test) {
  count = 0;
  for (var element in array) {
    if (test(array[element])) {
       count++;
       break;
    }
  }
  if (count != 0) return true;
  else return false;
}

console.log(every([NaN, NaN, NaN], isNaN));

console.log(every([1, NaN, NaN], isNaN));

console.log(some([NaN, 1, NaN], isNaN));

console.log(some([1 ,2, 3], isNaN));
