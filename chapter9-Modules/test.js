var myRe = /\d+/g;
var myArray = [];
var str = 'Это прив222 ет. миру! а также444  какая .- то аб.ракадабра 222 333 ';
var i = 0;

while ((myArray[i] = myRe.exec(str)) !== null) { // при каждом проходе обновляется lastIndex
  var msg = 'Найдено ' + myArray[i] + '. ';
  msg += 'Следующее сопоставление начнётся с позиции ' + myRe.lastIndex;
  console.log(msg);
  i++;
}

console.log(myArray);
