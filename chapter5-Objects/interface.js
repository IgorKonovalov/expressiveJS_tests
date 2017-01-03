// метод next перемещает позицию на 1 и если дошли до конца, возвращает false, current - текущий элемент
function ArraySeq(array) {
  this.position = -1;    // создадим объект для последовательности, позиция -1 потому что в методе next мы увеличиваем ее на единицу
  this.array = array;
}

ArraySeq.prototype.next = function() {
  if (this.position > this.array.length - 2) // длина к примеру 3, -1 дает 0, 0 - 1, 1 -2. 1+2 = array.length
    return false;
  this.position++;
  return true;
};

ArraySeq.prototype.current = function() {
  return this.array[this.position];
}

function logFive(sequence) {
  for (var i = 0; i < 5; i++) {
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

logFive(new ArraySeq([1, 2, 3, 4]));

function RangeSeq(from, to) {
  this.position = from - 1; // так же, задаем на 1 меньше, тк в методе next при вызове сначала прибавляется 1
  this.to = to;
}
RangeSeq.prototype.next = function() {
  if (this.position >= this.to) 
    return false;
  this.position++;
  return true;
}
RangeSeq.prototype.current = function() {
  return this.position;
}

logFive(new RangeSeq(19, 25));
