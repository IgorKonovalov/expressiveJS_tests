function fPTest(sometext) {
  return function(somemoretext) {
    return sometext + "fucking" + somemoretext;
  };
}


console.log(fPTest()());
