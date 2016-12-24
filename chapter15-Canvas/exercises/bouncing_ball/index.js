

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
  console.log("dx: " + dx + "dy: " + dy);
}
