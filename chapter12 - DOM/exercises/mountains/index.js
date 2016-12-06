var table = document.body.getElementsByTagName("table");
var m_table = table[0];


// мое решение, через циклы напрямую

function buildTable(data) {
  var td = document.createElement("td");
  var keys = Object.keys(data[0]);
  for (var i = 0; i <= data.length; i++) {
    var tr = document.createElement("tr");
    if (i == 0) {
      for (var key in keys) {
        var th = document.createElement("th");
        tr.appendChild(th).appendChild(document.createTextNode(keys[key]));
      }
    } else {
      for (var key in keys) {
        var td = document.createElement("td");
        if (!isNaN(data[i-1][keys[key]]))
          td.setAttribute("style", "text-align: right");
        tr.appendChild(td).appendChild(document.createTextNode(data[i -1][keys[key]]));
      }
    }
    m_table.appendChild(tr);
  }
  return m_table;
}

// решение с сайта, функционально и универсально

function buildTable2(data) {
  var table = document.createElement("table"); // создает таблицу вместо поиска (логично)

  var fields = Object.keys(data[0]);
  var headRow = document.createElement("tr");
  fields.forEach(function(field) { // заголовок
    var headCell = document.createElement("th");
    headCell.textContent = field;
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data.forEach(function(object) {
    var row = document.createElement("tr");
    fields.forEach(function(field) {
      var cell = document.createElement("td");
      cell.textContent = object[field];
      if (typeof object[field] == "number")
        cell.style.textAlign = "right";
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
}


buildTable(MOUNTAINS);
