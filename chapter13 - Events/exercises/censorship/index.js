// нужные нам коды кнопок:
// Q: 81
// W: 87
// X: 88

// хорошая статья: https://learn.javascript.ru/keyboard-events

let inputs = document.getElementsByClassName("text");
inputs[0].addEventListener("keydown", function(event) {
  if ((event.keyCode == 81) | (event.keyCode == 87) | (event.keyCode == 88)) {
    console.log("за вами уже выехали " + event.keyCode);
    event.preventDefault();
  };
});
