function all(promises) { // подсмотрено в ответах тк с промисами пока ничего не понятно
  return new Promise(function(succeed, fail) { // функция возвращает новый промис
    let results = [], pending = promises.length; // результат представлен в виде массива, в функцию так же передается массив
    promises.forEach(function(promise, i) { // для каждого из элементов этого массива i - порадковый номер
      promise.then(function(result) { // когда промис выполнен, возвращается функция (then)
        results[i] = result; // ответ записывается в массив результатов
        pending -= 1; // количество ожидающих промисов уменьшается на 1
        if (pending == 0) // и когда дошли до последнего
          succeed(results); // возвращаем результат
      }, function(error) {
        fail(error); // или кидаем ошибку - мы еще внутри then
      });
    });
    if (promises.length == 0)
      succeed(results);
    });
}

// Тест
all([]).then(function(array) {
  console.log("Это должен быть []:", array);
});
function soon(val) {
  return new Promise(function(success) {
    setTimeout(function() { success(val); },
               Math.random() * 500);
  });
}
all([soon(1), soon(2), soon(3)]).then(function(array) {
  console.log("Это должно быть [1, 2, 3]:", array);
});
function fail() {
  return new Promise(function(success, fail) {
    fail(new Error("boom"));
  });
}
all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("Мы не должны были сюда попасть");
}, function(error) {
  if (error.message != "boom")
    console.log("Неожиданная ошибка:", error);
});
