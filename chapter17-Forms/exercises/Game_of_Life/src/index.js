
// начальные константы

const cx = document.querySelector("canvas").getContext("2d");
const scale = 40; // в будущем будет меняться
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);

// создаем массив клеток (все незаполнены)

console.log(rowCount + " " + columnCount);

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

function isPointInBox(p, column, row) { // проверка, попадаем ли мы в клетку
  let b = boxPosition(column, row);
  return !(p.x < b.x ||
           p.y < b.y ||
           p.x > b.x + scale ||
           p.y > b.y + scale);
};

function boxPosition(column, row) { // возвращает пиксельные координаты клетки по column и row
  return {
    x: column * scale,
    y: row * scale
  };
};




function drawGrid() { // рисуем решетку
  cx.beginPath();
  cx.strokeStyle = "white";
  cx.lineWidth = .7;
  for (let i = 0; i < cx.canvas.height / scale; i++) {
    cx.moveTo(0, scale + scale * i);
    cx.lineTo(cx.canvas.width, scale + scale * i);
  }
  for (let i = 0; i < cx.canvas.width / scale; i++) {
    cx.moveTo(scale + scale * i, 0);
    cx.lineTo(scale + scale * i, cx.canvas.height);
  }
  cx.stroke();
}



function updateSquareOnClick() {
  document.getElementById("game").addEventListener("click", function(e) {
    let p = { x: e.offsetX, y: e.offsetY }; // p - position

    cx.fillStyle="#FF0000";  // проверка
    cx.fillRect(p.x, p.y, scale, scale);
  });
}

function draw() {
  cx.clearRect(0, 0, cx.canvas.height, cx.canvas.width);
  drawGrid();
  updateSquareOnClick()
  //drawLife();
}

// поехали!

draw();
