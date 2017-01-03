var input = "Строчка с 3 числами в ней... 42 и 88." ;
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Нашел", match[1], " на ", match.index);
// ->  Нашел 3  на  10
//     Нашел 42  на  29
//     Нашел 88  на  34
