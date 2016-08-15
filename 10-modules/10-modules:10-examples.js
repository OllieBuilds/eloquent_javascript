'use strict';

// Prevents names variable rom polluting global space by using
// a function to create local scope
let dayName = function() {
  let names = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

// console logs answer without providing any data to other modules
// wrap in () interprets as function expression
(function () {
  function square(x) {
    return x * x;}
    let hundred = 100;
    console.log(square(hundred));
  })();

  // Objects as Interfaces

  let weekDay = function () {
    let names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];
    return {
      name: function(number) { return names[number]; },
      number: function(name) { return names.indexOf(name); }
    };
  }();

  (function(exports) {
    let names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];
    exports.name = function(number) {
      return names[number];
    };
    exports.number = function (name) {
      return names.indexOf(name);
    }
  })(this.weekDay = {});

  console.log(weekDay.name(weekDay.number("Saturday")));
  // -> Saturday

  // Evaluating Data as Code

// interpreting data as code with Function constructor
let plusOne = new Function("n", "return n + 1;");

// Require

function require(name) {
  let code = new Function("exports", readFile(name));
  let exports = {};
  code(exports);
  return exports;
}

console.log(require("weekDay").name(1));
// -> Monday

// Constructor (above) wraps the module code in a function
// thus eliminating the need for wrapping the namespace in the
// module file itself (exports)

// so...
let names = ["Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"];

exports.name = function(number) {
  return names[number];
};
exports.number = function(name) {
  return names.indexOf(name);
};

let weekDay = require("weekDay");
let today = require("today");

// Fixing problems with above method
// CommonJS modules
// simplistic version of GA's templated module.exports = {...}
function require(name) {
  if (name in require.cache)
    return require.cache[name];

  let code = new Function("exports, module", readFile(name));
  let exports = {}, module = {exports: exports};

  require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

// see Browersify

// using dependencies with AMD
// see RequireJS
define(["weekDay", "today"], function(weekDay, today) {
  console.log(weekDay.name(today.dayNumber()));
})
