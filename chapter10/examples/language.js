//
// Парсер
//
function parseExpression(program) {
  program = skipSpace(program);
  var match, expr; // создает объекты регулярного выражение и объект, куда будет скопирован код после парсинга
  if (match = /^"([^"]*)"/.exec(program)) // если распознает строку - копирует второе вхождение?
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program)) // если распознает число - копирует первое вхождение
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program)) // если распознает слово - первое вхождение
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Неожиданный синтаксис: " + program); // выбрасывает ошибку если неожиданный синтаксис

  return parseApply(expr, program.slice(match[0].length)); // обработанная часть передается дальше..
}


function skipSpace(string) { // удаляет пробелы в начале строки, игнорирует строку если там есть комментарии
  var skip = string.match(/^(\s|#.*)*/);
  return string.slice(skip[0].length); //  0 элемент - это первое полное вхождение совпадения
}

function parseApply(expr, program) { // определяет, является ли обработанная часть программы выражением
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1)); // если начинается со скобки, значит внутри - список аргументов.
  expr = {type: "apply", operator: expr, args: []}; // тип - аргумент, оператор - выражение, аргументы в массив
  while (program[0] != ")") { // пока мы не доходим до закрывающей скобки
    var arg = parseExpression(program); // передаем в парсер
    expr.args.push(arg.expr); // записываем в массив аргументов
    program = skipSpace(arg.rest); // пропускаем пробел
    if (program[0] == ",") // если на первом месте запятая,
      program = skipSpace(program.slice(1)); // еще раз пропускаем пробелы
    else if (program[0] != ")") // если не запятая, кидаем ошибку
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1)); // вызываем рекурсивно для остатка строки
}


function parse(program) { // оборачиваем все это в функцию
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}

// console.log(parse("+(a, 10)")); // простой тест
// { type: 'apply',
//   operator: { type: 'word', name: '+' },
//   args: [ { type: 'word', name: 'a' }, { type: 'value', value: 10 } ] }

//
// Интерпретатор
//

function evaluate(expr, env) { // интерпретатор связывает значение expr с кодом в окружении
  switch(expr.type) { // в зависимости от типа значения возвращает разное
    case "value":
      return expr.value;

    case "word":
      if (expr.name in env)
        return env[expr.name];
      else
        throw new ReferenceError("Undefined variable: " +
                                 expr.name);
    case "apply":
      if (expr.operator.type == "word" &&
          expr.operator.name in specialForms) // если особая форма - передаем аргументы вместе с окружением в функцию
        return specialForms[expr.operator.name](expr.args,
                                                env);
      var op = evaluate(expr.operator, env);
      if (typeof op != "function")
        throw new TypeError("Applying a non-function.");
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

// специальные формы


var specialForms = Object.create(null); // на всякий случай убираем прототип

specialForms["if"] = function(args, env) {
  if (args.length != 3)
    throw new SyntaxError("Неправильное количество аргументов для if");

  if (evaluate(args[0], env) !== false) // похоже на ?:. - если верно первое выражение, возвращает второе,
    return evaluate(args[1], env);
  else
    return evaluate(args[2], env); // если неверно - то третье
};

specialForms["while"] = function(args, env) {
  if (args.length != 2)
    throw new SyntaxError("Неправильное количество аргументов для while");

  while (evaluate(args[0], env) !== false)
    evaluate(args[1], env);

  // Тк undefined нет в Egg, возвращаем false

  return false;
};

specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};

specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Неправильное использование define");
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
};

// Окружение

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

// var prog = parse("if(true, false, true)"); // простой тест - меняем true на false
// console.log(evaluate(prog, topEnv));

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) { // определяем операторы с помощью конструктора Function
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});


topEnv["print"] = function(value) { // оборачиваем вывод
  console.log(value);
  return value;
};


// проверка - в конце


function run() { // создает свежее окружение, парсит и разбирает строчки так, как будто они являются одной программой
  var env = Object.create(topEnv);
  var program = Array.prototype.slice
    .call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}

// run("do(define(total, 0),",      // -> 55 работает!
//     "   define(count, 1),",
//     "   while(<(count, 11),",
//     "         do(define(total, +(total, count)),",
//     "            define(count, +(count, 1)))),",
//     "   print(total))");


specialForms["fun"] = function(args, env) { // расценивает последний аргумент как тело функции, а все предыдущие - имена аргументов
  if (!args.length)
    throw new SyntaxError("Функции нужно тело");
  function name(expr) {
    if (expr.type != "word")
      throw new SyntaxError("Имена аргументов должны быть words");
    return expr.name;
  }
  var argNames = args.slice(0, args.length - 1).map(name); // имена аргументов - все кроме последнего
  var body = args[args.length - 1]; // последний аргумент - тело функции

  return function() { // собираем функцию
    if (arguments.length != argNames.length)
      throw new TypeError("Неверное количество аргументов");
    var localEnv = Object.create(env); // локальное окружение является объектом
    for (var i = 0; i < arguments.length; i++)
      localEnv[argNames[i]] = arguments[i];
    return evaluate(body, localEnv);
  };
};

// простая проверка работоспособности функций

// run("do(define(plusOne, fun(a, +(a, 1))),", // функция, складывающая числа
//     "   print(plusOne(10)))");
//
// run("do(define(pow, fun(base, exp,", // функция, возводящая в степень - еще и рекурсивная
//     "     if(==(exp, 0),",
//     "        1,",
//     "        *(base, pow(base, -(exp, 1)))))),",
//     "   print(pow(2, 10)))");



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// задача 1 - добавление в окружение функции массивов.

topEnv["array"] = function(args) {
  return Array.prototype.slice.call(arguments, 0); // мы превращаем массивоподобный объект в настоящий массив
  // см https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
};

topEnv["length"] = function(array) {
  return array.length;
};

topEnv["element"] = function(array, element) {
  return array[element];
};


// run("do(define(sum, fun(array,",
//     "     do(define(i, 0),",
//     "        define(sum, 0),",
//     "        while(<(i, length(array)),",
//     "          do(define(sum, +(sum, element(array, i))),",
//     "             define(i, +(i, 1)))),",
//     "        sum))),",
//     "   print(sum(array(1, 2, 3))))");

// задача 2 - потому что объект локального окружения при сборке функции имеет в качестве прототипа переданный в функции
// обьект окружения, то есть функция, вложенная в другую будет иметь доступ к локальной переменной, объявленной
// внутри этой функции тк она наследуется от нее.

// задача 3
// skipSpace - изменения см. вверху
// console.log(parse("# hello\nx"));

// задача 4

specialForms["set"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Неправильное использование set");
  var name = args[0].name;
  var value = evaluate(args[1], env);

  for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) { // проходит по стеку функций и если находит переменную с тем же
    if (Object.prototype.hasOwnProperty.call(scope, name)) { // переменную с тем же именем
      scope[name] = value; // перезаписывает ее
      return value;
    }
  }

  throw new ReferenceError("Вначале определите переменную " + name + " с помощью define");
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");

run("set(quux, true)");
