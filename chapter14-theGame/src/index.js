var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];

function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = []; // для решетки
  this.actors = []; // для движущихся частей

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = []; // заполняем массив - уровень, строки
    for (var x = 0; x < this.width; x++) { // cодержимое строки
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch)); // если на клетке что-то движущееся
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }
  this.player = this.actors.filter(function(actor) { // для игрока используем фильтр
    return actor.type = "player";
  }, 0);
  this.status = this.finishDelay = null; // status отслеживает, выиграл игрок или проиграл
};

Level.prototype.isFinished = function () { // чтоб узнать, закончен или нет уровень
  return this.status != null && this.finishDelay < 0;
};

// для хранения позиции и размера актеров

function Vector(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.times = function (factor) { // для масштабирования
  return new Vector(this.x * factor, this.y * factor);
};

// обьект для связи с символами конструктора и юниты

var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};

function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
};

Player.prototype.type = "player";

function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}

Lava.prototype.type = "lava";

function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
};
Coin.prototype.type = "coin";

// // простая проверка
// var simpleLevel = new Level(simpleLevelPlan);
// console.log(simpleLevel.width, "by", simpleLevel.height);

// рисование

function elt(name, className) { // создание элемента с заданным классом в DOM
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "game")); // создаем окружающий элемент wrapper и сразу соъраняем в переменной
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20; // для масштабирования

DOMDisplay.prototype.drawBackground = function () { // рисуем фон - таблица, каждая ячейка - элемент.
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function (row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function (type) { // класс ячейки задан типом ячейки
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

DOMDisplay.prototype.drawActors = function () {
  var wrap = elt("div");
  this.level.actors.forEach(function (actor) {
    var rect = wrap.appendChild(elt("div", "actor " + actor.type)); // чтоб задать больше одного класса разделяем пробелами
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function () {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game" + (this.level.status || "");
  this.scrollPlayerIntoView;
};

DOMDisplay.prototype.scrollPlayerIntoView = function () { // сдвигаем экран относительно положения игрока
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // точка зрения

  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.scroll.scrollTop, bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.c > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function () {
  this.wrap.parentNode.removeChild(this.wrap);
};

var simpleLevel = new Level(simpleLevelPlan);
var display = new DOMDisplay(document.body, simpleLevel);
