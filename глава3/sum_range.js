function range(start, end, range) { // создаем массив заданных размеров и с заданным шагом
  var m = [];
  if (range == undefined) range = 1;
  if ((start < end)&&(range > 0)) {
    for (i = 0; i < (end - start) + 1; i = i + range) {
      m.push(start + i);
    }
  } else if ((start > end)&&(range < 0)) {
    for (i = 0; i > (end - start) - 1; i = i + range) {
      m.push(start + i);
    }
  } else m.push("Мне нужны логичные условия")
  return m;
}

function sum(arr) { // считаем сумму чисел массива
  var sum = 0;
  for (var number in arr)
    sum += arr[number];
  return sum;
}
console.log(range(100,1,-3));
