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

function gatherCorrelations(journal) {
  var phis = {};
  journal.forEach(function (entry) {
    entry.events.forEach(function (event) {
      if (!event in phis) {
        phis[event] = phi(tableFor(event, journal));
      }
    });
  });
  return phis;
}

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

noisy(Boolean)(1);

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
