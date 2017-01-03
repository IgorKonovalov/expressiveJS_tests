function Vector(x, y) {
  this.x = x;
  this.y = y;
}

// console.log(new Vector(1, 2));


Vector.prototype.plus = function(other) {
  y = this.y + other.y;
  x = this.x + other.x;
  return new Vector(x, y);
}


Vector.prototype.minus = function(other) {
  y = this.y - other.y;
  x = this.x - other.x;
  return new Vector(x, y);
}


Object.defineProperty(Vector.prototype, "length", { // геттер! 
  get: function(){
    var length = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    return length;
  }
});

console.log(new Vector(1, 2).minus(new Vector(2, 3)));

console.log(new Vector(20,40).length);
