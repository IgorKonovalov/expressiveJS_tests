var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

function makeObjectCentures(array) {
  var centures = {};
  array.forEach(function (person) {
    age = Math.ceil(person.died / 100);
    if (!(age in centures))
      centures[age] = age;
  });
  return centures;
}

function groupBy(array, test) {
  var result = test(array);
  for (var age in result) {
    var temp = [];
    array.forEach(function (person) {
      var agetemp = Math.ceil(person.died / 100);
      if (agetemp == age)
        temp.push(person.died - person.born);
    });
    result[age] = average(temp);
  }
  return result;
}

console.log(groupBy(ancestry, makeObjectCentures));

// for (var age in centures) {
//   var temp = [];
//   ancestry.forEach(function (person) {
//     var agetemp = Math.ceil(person.died / 100);
//     if (agetemp == age)
//       temp.push(person.died - person.born);
//   });
//   centures[age] = average(temp);
// }
// console.log(centures);
