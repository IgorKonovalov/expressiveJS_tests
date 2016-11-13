var ANCESTRY_FILE = require('./ancestry.js');

var ancestry = JSON.parse(ANCESTRY_FILE);


var byName = {};

ancestry.forEach(function(person){
  byName[person.name] = person;
});

// console.log(byName);

function reduceAncestors(person, f, defaultValue) { // функция обхода фамильного дерева, ищет родственников
  function valueFor(person) {                       // и для всех найденных применяет функцию
    if (person == null) // если не нашла такого человека, возвращает defaultValue
      return defaultValue;
    else  // если нашла, рекурсивно вызывает сама себя для предков
      return f(person, valueFor(byName[person.mother]),   // дерево разделяется на отца и мать, рекурсивно
                       valueFor(byName[person.father]));  // до тех пор, пока предков не останется, к каждому применяется функция
  }
  return valueFor(person);   // вызов внутренней функции
}

function sharedDNA(person, fromMother, fromFather) {  // fromMother = valueFor(byName[person.mother]);...
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

var ph = byName["Philibert Haverbeke"]; // считает процент днк для деда, упомянутого в файле и делит в дальнейшем на 4

console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

function countAncestors(person, test) { // подсчитывает количество предков данного человека, удовлеторяющих условию
  function combine(person, fromMother, fromFather) {
    var thisOneCounts = test(person);
    return fromMother + fromFather + (thisOneCounts ? 1 : 0);
  }
  return reduceAncestors(person, combine, 0);
}

function longLivingPercentage(person) {
  var all = countAncestors(person, function (person) {
    return true;
  });
  var longLiving = countAncestors(person, function (person) {
    return (person.died - person.born) >= 70;
  });
  return longLiving / all;
}
console.log(longLivingPercentage(byName["Emile Haverbeke"]));
