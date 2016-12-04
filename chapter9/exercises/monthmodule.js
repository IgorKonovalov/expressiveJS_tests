// (function (exports) {
//   var names = [
//     "январь",
//     "февраль",
//     "март",
//     "апрель",
//     "май",
//     "июнь",
//     "июль",
//     "август",
//     "сентярь",
//     "октябрь",
//     "ноябрь",
//     "декабрь"
//   ];
//   exports.name = function (number) {
//     return names[number];
//   };
//   exports.number = function (name) {
//     return names.indexOf(name);
//   }
// })(this.month = {});


var month = function() {
  var names = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентярь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ];
  return {
    name: function (number) { return names[number-1]; },
    number: function (name) { return names.indexOf(name)+1; }
  };
}();


console.log(month.name(1));

console.log(month.number("май"));
