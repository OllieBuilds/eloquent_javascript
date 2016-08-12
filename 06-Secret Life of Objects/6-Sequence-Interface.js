'use strict';

function ArraySeq(arr) {
  this.pos = -1;
  this.arr = arr;
};

ArraySeq.prototype.next = function(){
  if(this.pos >= this.arr.length -1){
    return false;
  }
  this.pos++;
  return true;
};

ArraySeq.prototype.current = function(){
  return this.arr[this.pos];
};

function RangeSeq(from, to){
  this.pos = from - 1;
  this.to = to;
}

RangeSeq.prototype.next = function() {
  if(this.pos >= this.to){
    return false;
  }
  this.pos++;
  return true;
};

RangeSeq.prototype.current = function() {
  return this.pos;
}

function logFive(sequence) {
  for(let i = 0; i < 5; i++){
    if(!sequence.next()){
      break;
    }
    console.log(sequence.current());
  }
};

logFive(new ArraySeq([1,2]));

logFive(new RangeSeq(10, 20));
