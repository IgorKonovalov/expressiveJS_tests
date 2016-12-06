function byTagName(node, tagName) {
  var found = [];
  tagName = tagName.toUpperCase();

  function explore(node) { // для рекурсии используем дополнительную внутреннюю функцию
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType == document.ELEMENT_NODE) { // проверяем, если узел является элементом (<div><h1>, итд)
        if (child.nodeName == tagName) // если совпадает, пихаем в массив
          found.push(child);
        explore(child); // рррррррррррекурсия! - изучаем вложенность
      }
    }
  }

  explore(node);
  return found;
}
console.log(byTagName(document.body, "span"));

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
var para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2
