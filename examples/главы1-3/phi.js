var JOURNAL = require('./journal.js')

function phi(table) { // подсчет переменной phi - вероятность события при условии, таблица (2 x 2)
  return (table[3] * table[0] - table[2] * table [1])/
    Math.sqrt((table[2] + table[3])
  *           (table[0] + table[1])
  *           (table[1] + table[3])
  *           (table[0] + table[2]));
}

function hasEvent(event, entry) { // проверяем, есть ли условие в записи
  return entry.events.indexOf(event) != -1;
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

function gatherCorrelations(journal) {
  var phis = {}; // создаем пустой map - обьект (свойство - значение)
  for (var entry = 0; entry < journal.length; entry++) { // для каждой записи в журнале
    var events = journal[entry].events; // создаем переменную для хранения условия в записи (это одномерный массив)
    // console.log("обрабатываю запись: " + events);
    for (var i = 0; i < events.length; i++) { //проходим по всем условиям в записи
      var event = events[i]; // создаем переменную для хранения условия
      if (!(event in phis)) { // если условие не входит в карту phis
        phis[event] = phi(tableFor(event, journal)); // добавляем связку условие - вероятность
      }
    }
  }
  return phis; // в результате получаем список условие - вероятность превращения
}

var correlations = gatherCorrelations(JOURNAL);

for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1)
    console.log(event + ": " + correlation);
}
