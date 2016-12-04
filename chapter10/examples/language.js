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

function skipSpace(string) { // удаляет пробелы в начале строки
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
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

  if (evaluate(args[0], env) !== false) // похоже на ?:.
    return evaluate(args[1], env);
  else
    return evaluate(args[2], env);
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
