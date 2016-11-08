var obj = {here: {is: "an"}, object: 2};

function deepEqual(a, b) { // функция глубокого сравнения
  if (a === b) return true;

  if (a == null || typeof a != "object" || // Если а или б ноль или не являются обьектами вернем ложь (для рекурсии)
      b == null || typeof b != "object")
    return false;

  var propsInA = 0, propsInB = 0; // задаем счетчики обьектов

  for (var prop in a)
    propsInA += 1;

  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }
  return propsInA == propsInB;
}

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
