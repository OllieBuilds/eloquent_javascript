'use strict';

let box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true; },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  let locked = box.locked;
  if(!locked)
    return body();

  box.unlock();
  try{
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("dubloons!");
});

try {
  withBoxUnlocked(function() {
    throw new Error ("Don't open that box!");
  });
} catch (e) {
  console.log("Error:", e);
}

console.log(box.locked);
