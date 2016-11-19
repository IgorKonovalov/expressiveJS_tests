var mountains = require('./mountains.js');

// console.log(mountains);

// minHeight возвращает число, показывающее минимельную высоту, которую требует ячейка (в строчках)
// minWidth возвращает число, показывающее минимальную ширину, которую треует ячейка (в символах)
// draw(width, height) возвращает массив длины height, содержащий наборы строк, каждая из которых
// шириной width символов. Это содержимое ячейки.

function rowHeights(rows) { // вычисление массива минимальной высоты строк
  return rows.map(function (row) { // возвращает массив, к каждому элементу которого применена функция
    return row.reduce(function (max, cell) { // получающая максимальную высоту из всех ячеек
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) { // вычисление массива минимальной ширины ячеек
  return rows[0].map(function (_, i) {
    return rows.reduce(function (max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}


function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) { // обычная ячейка
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

function UnderlinedCell(inner) { // ячейка с подчеркиванием
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

function RTextCell(text) { // ячейка со сдвигом к правому краю, наследуется от TextCell
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function (row) {
    return keys.map(function (name) {
      var value = row[name];
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(mountains)));

var rows = []; // для примера
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  rows.push(row);
}
// console.log(drawTable(rows));
