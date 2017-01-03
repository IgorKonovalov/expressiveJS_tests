function InputError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
InputError.prototype  = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase()=="left") return "L";
  if (result.toLowerCase()=="right") return "R";
  throw new InputError("Недопустимое направление: " + result);
}

function look() {
  if (promptDirection("Куда?") == "L") return "дом";
  else return "двух разьяренных медведей";
}

for (;;) {
  try {
    var dir = promptDirection("Куда?");
    console.log("Ваш выбор", dir);
    break;
  } catch (e) {
    if (e instanceof InputError)
      console.log("Недопустимое направление");
    else
      throw e;
  }
}
