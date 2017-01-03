function isEven(num) {
  if (num == 0) return true;
  else if (num == 1) return false;
  else if (num > 0) return(isEven(num-2));
  else if (num < 0) return(isEven(num+2));
}

console.log("The number 50 is even? " + isEven(50));
console.log("The number 75 is even? " + isEven(75));
console.log("The number -1 is even? " + isEven(-1));
