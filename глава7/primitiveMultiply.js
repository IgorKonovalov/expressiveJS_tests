function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      var result = primitiveMultiply(a, b)
      break;
    } catch(e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log("Ошибка");
        continue;
      }
    }
  }
  return result;
}

console.log(reliableMultiply(8, 8));
