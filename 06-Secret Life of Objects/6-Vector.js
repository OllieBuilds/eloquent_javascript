'use strict';

// A Vector Type
function Vector(x, y){
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function(vector) {
  return(new Vector(this.x + vector.x, this.y + vector.y));
};

Vector.prototype.minus = function(vector) {
  return(new Vector(this.x - vector.x, this.y - vector.y));
};

// Getter function
Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    // pythagorean theorem to calculate length from origin
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
});

console.log(new Vector(1,2).plus(new Vector(3,4)));
console.log(new Vector(1,2).minus(new Vector(3,4)));
console.log(new Vector(3, 4).length);
