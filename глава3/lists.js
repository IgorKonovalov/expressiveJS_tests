// var list = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: null
//     }
//   }
// };
function prepend(value, list) {
  list = {value: value, rest: list}
  return list;
}
var list_temp = { value: 10, rest: { value: 20, rest: null } };

function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--) {
    list = prepend(array[i],list);
  }
  return list;
}

function listToArray(list) {
  var array = [];
  while (list.rest != null) {
    array.push(list.value);
    list = list.rest;
  }
  array.push(list.value);
  return array;
}


function nth(list, position) {
  var element;
  if (position == 0) element = list.value;
  for (var i = 0; i < position; i++) {
    if (list.rest != null) {
      list = list.rest;
      element = list.value;
    }
    else element = undefined;
  }
  return element;
}

function nthReqursion(list, position) { // доделать
  if (position != 0) return nthReqursion(list.rest, position - 1);
  else return list.value;
}

console.log(listToArray(arrayToList([10,20,30])));
console.log(nth(arrayToList([10,20,30]),2));
console.log(nthReqursion(arrayToList([10,20,30,40,50]),10));
