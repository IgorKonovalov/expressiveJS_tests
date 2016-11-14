var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

var centures = {};
var i = 0;

ancestry.forEach(function (person) {
  age = Math.ceil(person.died / 100);
  if (!(age in centures))
    centures[age] = age;
});

for (var age in centures) {
  var temp = [];
  ancestry.forEach(function (person) {
    var agetemp = Math.ceil(person.died / 100);
    if (agetemp == age)
      temp.push(person.died - person.born);
  });
  centures[age] = temp;
}
console.log(centures);
