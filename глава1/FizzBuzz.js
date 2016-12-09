var num = 1;
while (num<=100) {
  if ((num % 3 != 0)&&(num % 5 != 0)) {
    console.log(num);
  } else if ((num % 3 == 0)&&(num % 5 == 0)) {
    console.log('FizzBuzz');
  } else if ((num % 3 == 0) && (num % 5 != 0)) {
    console.log('Fizz');
  } else if ((num % 3 != 0) && (num % 5 == 0)) {
    console.log('Buzz');
  }
  num++;
}

// коротко :)
var i = 1,

	f = 'Fizz',
	b = 'Buzz',
	out = '';

for (; i <= 100; i++) {

	out = !(i % 3) ?  !(i % 5)? f+b : f : !(i % 5)? b : i;
	console.log(out);

}
