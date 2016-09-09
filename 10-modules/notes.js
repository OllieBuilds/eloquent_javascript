'use strict';


// This pollutes the global namespace

// let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
//               "Friday", "Saturday"];
// function dayName(number) {
//   return names[number];
// }
//
// console.log(dayName(1));
// Returns Monday

// This creates a module interface preventing spillage into global skipSpace
let dayName = function() {
  let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

// Following module logs a value to the console but does not actually
// privde any values for other modules to use
// Real world application could be adding a method to a prototype or
// or setting up a widget on a web page
(function() {
  function square(x) {return x * x; }
  let hundred = 100;

  console.log(square(hundred));
})();

// This is a function expresssion -->
function doStuff1(x) {
  function stuff(x) {return x;}

  console.log(stuff("Stuff"));
};
doStuff1(1);

// This is a function declaration -->
(function doStuff2(x) {
  function stuff(x) {return x;}

  console.log(stuff("Things"));
})();

// Objects as Interfaces
let weekDay = function() {
  let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// uses dot notation to access functions within weekDay module

(function(exports) {
  let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];

  exports.name = function(number) {
    return names[number];
  };
})(this.weekDay = {});

(function(exportsTwo) {
  exportsTwo.number = function(name) {
    return names.indexOf(name);
  };
})(this.weeDay = {});

console.log(weekDay.name(weekDay.number("Saturday")) + " line 78");

// Evaluating Data as Code
  // Function Constructor
let plusOne = new Function('n', 'return n + 1');
console.log(plusOne(4) + " line 83");

  // Require
  // this function does not work because readFile is not defined
            // function require(name) {
            //   let code = new Function("exports", readFile(name));
            //   let exports = {};
            //   code(exports);
            //   return exports;
            // }
            //
            // console.log(require("weekDay").name(1));

  // Asynchronous Module Definition (AMD)
  // define takes an array of module names
  //
// define(['weekDay', 'today'], function(weekDay, today) {
//   console.log(weekday.name(today.dayNumber())+ " line 98");
// });

// There are two popular, well-defined approaches to to such modules.
// One is called CommonJSModules and revolves aroudn a 'requiire' funciton that
// fetches a module by name and returns its interface.
// The other is called Asynchronous Module Definition (AMD) and uses a 'define'
// function that takes an array of module names and a function and,
// after loading the modules, runs the function with their interfaces as arguments.
