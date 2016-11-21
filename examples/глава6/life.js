var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
  this.space = new Array(width * height); // передавая при создании объекта int мы указываем длину массива. (в нашем случае площадь поля)
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
}

Grid.prototype.forEach = function(f, context) { // вызывает функцию для каждого элемента
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

// var grid = new Grid(5, 5); // элементарная проверка для обьекта Grid и его методов
// console.log(grid.get(new Vector(1, 1))); // -> undefined
// grid.set(new Vector(1, 1), "X");
// console.log(grid.get(new Vector(1, 1))); // -> X

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function BouncingCritter() {
  this.direction = randomElement(Object.keys(directions)); // получаем все имена направлений из объекта
};

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

// мировой обьект

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch](); // создаем экземпляр нужного типа
  element.originChar = ch; // дополнительное свойство, чтобы было просто выяснить, из какого символа был создан элемент
  return element;
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else return element.originChar;
}

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length); // локальная переменная, через которую внутренняя функция получает доступ к сетке
  this.grid = grid;
  this.legend = legend;
  map.forEach(function (line, y) { // проходит по карте, заполняя grid в виде векторо - тип элемента
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y), elementFromChar(legend, line[x])); // нельзя this.grid
  });
}

World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

function Wall() {} // пустой объект для занятия места


World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function (critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) { // для того, чтобы знать, что обьект уже походил
      acted.push(critter); // массив походивших объектов
      this.letAct(critter, vector); // ход!
    }
  }, this); // второй аргумент для форича чтобы мы могли обращаться к this.letAct
}

World.prototype.letAct = function(critter, vector) { // см. проверку входных данных - проверка возможности действия в мире, а не существе
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") { // если есть действие и оно "move"
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) { // если есть направление и клетка в этом направлении пуста
      this.grid.set(vector, null);  // обнуляем место, где было существо
      this.grid.set(dest, critter); // записываем существо в новое место
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
View.prototype.look = function(dir) { // вычисляет координаты, на которые мы пытаемся посмотреть
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)) // если они внутри сетки, получает символ, соответствующий элементу там
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0)
    return null;
  return randomElement(found);
};

// для анимации сложная функция без обьяснений

(function() {
  "use strict";

  var active = null;

  function Animated(world) {
    this.world = world;
    var outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
    var node = outer.appendChild(doc.createElement("div"));
    node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(world.toString()));
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
      "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
    this.button.innerHTML = "stop";
    var self = this;
    this.button.addEventListener("click", function() { self.clicked(); });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setInterval(function() { self.tick(); }, 333);
  }

  Animated.prototype.clicked = function() {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      var self = this;
      this.interval = setInterval(function() { self.tick(); }, 333);
      this.button.innerHTML = "stop";
    }
  };

  Animated.prototype.tick = function() {
    this.world.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
  };

  Animated.prototype.disable = function() {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateWorld = function(world) { new Animated(world); };
})();

var world = new World(plan, {"#": Wall, "o": BouncingCritter});

animateWorld(world);
