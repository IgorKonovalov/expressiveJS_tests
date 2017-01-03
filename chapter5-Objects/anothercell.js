
function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) { // Конструктор обычной ячейки
  this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() { // метод, возвращающий минимально возможную ширину ячейки
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};



// тут мой код

function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}
StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth());
}
StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight());
}
StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
}

var sc = new StretchCell(new TextCell("abcde"), 2, 2);
console.log(sc.minWidth());
console.log(sc.minHeight());
console.log(sc.draw(10, 10));
