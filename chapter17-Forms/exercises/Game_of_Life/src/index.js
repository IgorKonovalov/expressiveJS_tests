
// начальные константы

const cx = document.querySelector("canvas").getContext("2d");
const scale = 40; // в будущем будет меняться
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);
const color = "#0095DD";

console.log("columns: " + columnCount + " rows: " + rowCount);


// создаем массив клеток

let boxes = [];
for (let c = 0; c < columnCount; c++) {
  boxes[c] = [];
  for (let r = 0; r < rowCount; r++) {
    boxes[c][r] = {x: 0, y: 0, status: 0}; // получаем массив, с номером column, row, в котором лежит объект с кординатами 0,0 и статусом
  }
}

// рандомизируем статус клеток

function boxRandomize() {
  boxes.forEach(function(boxColumn) {
    boxColumn.forEach(function(box) {
      box.status = Math.round(Math.random()); // 1 или 0
    });
  });
}

// изменение состояния по клику

function clickOnBox(p, box) {
  return !(p.x < box.x ||
           p.y < box.y ||
           p.x > box.x + scale ||
           p.y > box.y + scale);
}


(function updateBoxOnClick() {
  document.getElementById("game").addEventListener("click", function(e) {
    let p = {x: e.offsetX, y: e.offsetY}; // обьект с позицией клика
    boxes.forEach(function(boxColumn) {
      boxColumn.forEach(function(box) {
        if (clickOnBox(p, box)) {
          if (box.status == 0) {
            box.status = 1;
            updateField();
          }
          else if (box.status == 1) {
            box.status = 0;
            updateField();
          }
        };
      });
    });
  });
})();

// отрисовка нового состояния поля

function drawBoxes(boxes) {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let boxX = c * scale;
      let boxY = r * scale;
      boxes[c][r].x = boxX;
      boxes[c][r].y = boxY;
      if (boxes[c][r].status == 1) {
        cx.beginPath();
        cx.rect(boxX, boxY, scale, scale);
        cx.fillStyle = color;
        cx.fill();
        cx.closePath();
      }
    }
  }
}

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


function updateField() {
  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
  drawBoxes(boxes);
  drawGrid();
  console.log("обновляю поле");
}

// логика



let boxesNextStep = [];
for (let c = 0; c < columnCount; c++) {
  boxesNextStep[c] = [];
  for (let r = 0; r < rowCount; r++) {
    boxesNextStep[c][r] = {x: 0, y: 0, status: 0};
  }
}

function getNextStep(boxes) {
  boxes.forEach(function(_, column) {
    _.forEach(function(box, row) {
      boxesNextStep[column][row].status = isAlive(boxes, column, row);
    })
  })
  return boxesNextStep;
}

function boxCopy(boxes, boxesNextStep) {
  boxes.forEach(function(_, column) {
    _.forEach(function(_, row) {
      boxes[column][row] = boxesNextStep[column][row];
    })
  })
  return boxes;
}

function isAlive(boxes, column, row) {
  let livecount = 0;
  if (column == 0) {
    
  }
}

// кнопки

let bNext = document.getElementById("step");
bNext.addEventListener("click", function () {
  getNextStep(boxes)
  boxCopy(boxes, boxesNextStep);
  updateField();
});

let bRandom = document.getElementById("random");
bRandom.addEventListener("click", function () {
  boxRandomize();
  updateField();
});

// начальный запуск

updateField();
