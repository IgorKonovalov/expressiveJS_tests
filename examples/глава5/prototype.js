// var empty = {};
// console.log(empty.toString);
// console.log(empty.toString());
//
// console.log(Object.getPrototypeOf({})==Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));
//
var protoRabbit = {
  speak: function (line) {
    console.log("А " + this.type + " кролик говорит '" + line + "'");
  }
};
// var killerRabbit = Object.create(protoRabbit);
// killerRabbit.type = "убийственный";
// killerRabbit.speak("ХРЯЯСЬ!")

function Rabbit(type) {
  this.type = type;
}

var killerRabbit = new Rabbit("убийственный");
var blackRabbit = new Rabbit("черный");

// console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
  console.log("А " + this.type + " кролик говорит '" + line + "'");
}

// blackRabbit.speak("Всем капец!");

Rabbit.prototype.teeth = "мелкие";

console.log(killerRabbit.teeth);

killerRabbit.teeth = "длинные, острые и окровавленные";
console.log(killerRabbit.teeth);
console.log(Rabbit.prototype.teeth);

// создание объекта без прототипа:

var map = Object.create(null);
map["пицца"] = 0.069;
console.log("toString" in map);
console.log("пицца" in map);
