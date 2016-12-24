

const canvas = document.querySelector("canvas");
let cx = canvas.getContext("2d");

let lastTime = null;
const ballRadius = 10;

function frame(time) {
  if (lastTime != null)
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
//
let x = canvas.width / 2;
let y = canvas.height - ballRadius;
let dx = -2;
let dy = -2;

function drawBall() {
  cx.beginPath();
  cx.arc(x, y, ballRadius, 0, Math.PI*2);
  cx.fillStyle = "red";
  cx.fill();
  cx.closePath();
}


function updateAnimation(step) {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
  if ((x > canvas.width - ballRadius) || (x < 0 + ballRadius))
    dx = - dx;
  if ((y > canvas.height - ballRadius) || (y < 0 + ballRadius))
    dy = - dy;
}

// элегантное решение (ответ)

// var x = 100, y = 300;
// var radius = 10;
// var speedX = 100, speedY = 60;
//
// function updateAnimation(step) {
//   cx.clearRect(0, 0, 400, 400);
//   cx.strokeStyle = "blue"; // обводка
//   cx.lineWidth = 4;
//   cx.strokeRect(25, 25, 350, 350);
//
//   x += step * speedX;
//   y += step * speedY;
//   if (x < 25 + radius || x > 375 - radius)
//     speedX = -speedX;
//   if (y < 25 + radius || y > 375 - radius)
//     speedY = -speedY;
//   cx.fillStyle = "red";
//   cx.beginPath();
//   cx.arc(x, y, radius, 0, 7);
//   cx.fill();
// }
