var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

var byName = {};

ancestry.forEach(function (person) {
  byName[person.name] = person;
});

var agedifference = [];

ancestry.forEach(function (person) {
  var mother = byName[person.mother];
  if (mother != null)
    agedifference.push(person.born - mother.born)
});

console.log(average(agedifference));
