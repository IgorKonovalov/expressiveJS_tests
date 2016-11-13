// примеры абстрактных функций

// функция, принимающая в качестве аргумента действие

function forEach(array, action) {
  for (var i = 0; i<array.length; i++)
    action(array[i])
}

forEach([1,2,3,4,5], console.log);

// передача функции в качестве аргумента

var numbers = [1,2,3,4,5],
    sum = 0;

forEach(numbers, function(number) {
  sum += number;
});

console.log(sum);

// сравнение записи функций

// стандартная запись

var journal = require('../главы1-3/journal.js')

console.log(journal);

function phi(table) { // подсчет переменной phi - вероятность события при условии, таблица (2 x 2)
  return (table[3] * table[0] - table[2] * table [1])/
    Math.sqrt((table[2] + table[3])
  *           (table[0] + table[1])
  *           (table[1] + table[3])
  *           (table[0] + table[2]));
}

function tableFor(event, journal) { // создаем таблицу для вычисления переменной phi
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++){
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index +=2;
    table[index] += 1;
  }
  return table;
}


function hasEvent(event, entry) { // проверяем, есть ли условие в записи
  return entry.events.indexOf(event) != -1;
}

function gatherCorrelations(journal) {
  var phis = {};
  for (var entry = 0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for (var i = 0; i < events.length; i++) {
      var event = events[i]
      if (!(event in phis)) {
        phis[event] = phi(tableFor(event, journal));
      }
    }
  }
  return phis;
}

// с форичем (является стандартной фичей масивов)

function gatherCorrelationsAbstract(journal) {
  var phis = {};
  journal.forEach(function(entry) {
    entry.events.forEach(function(event) {
      if (!(event in phis)) {
        phis[event] = phi(tableFor(event, journal));
      }
    });
  });
  return phis;
}

// console.log(gatherCorrelationsAbstract(journal));

// функция, создающая новые функции

function greaterThan(n) {
  return function (m) {
    return m > n;
  };
}

var greaterThan10 = greaterThan(10);

console.log(greaterThan10(9)); // false

// функция, меняющая другие функции

function noisy(f) {
  return function(arg) {
    console.log("calling with", arg);
    var val = f(arg);
    console.log("called with", arg, "- got", val);
    return val;
  };
}

noisy(Boolean)(0);

// функция, создающая новые типы управления потоком выполнения программы (это даже почти понятно)

function unless(test, then) {
  if(!test) then();
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) body(i);
}

repeat(5, function (n) {
  unless(n%2, function () {
    console.log(n, "is even");
  });
});
