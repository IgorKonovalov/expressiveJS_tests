var rabbit = {};

rabbit.speak = function (line) {
  console.log("Кролик говорит '" + line + "'");
};

// rabbit.speak("Я живой.")

function speak(line) {
  console.log("А " + this.type + " кролик говорит '" + line + "'");
}
var whiteRabbit = {type: "белый", speak: speak};
var fatRabbit = {type: "толстый", speak: speak};

// whiteRabbit.speak("Ушки мои и усики, я же наверняка опаздываю!");
// fatRabbit.speak("Мне бы сейчас морковочки!");

speak.apply(fatRabbit, ["Отрыжка!"]);
speak.call({type:"старый"}, "О, господи.");
