var a = [1,2,3].map(n => n + 1);
console.log(a);

function square() {
  let example = () => { // безымянная функция, возвращающая =>
    let numbers = [];
    for (let number of arguments) { // for .. of проходит по values, итератор
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

let b = square(2, 4, 7.5, 8, 11.5, 21);
console.log(b);
