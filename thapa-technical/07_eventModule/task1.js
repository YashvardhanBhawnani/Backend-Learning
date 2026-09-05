const EventEmitter = require("events");
const emitter = new EventEmitter();

const eventCnt = {
  login: 0,
  logout: 0,
  purchase: 0,
  update: 0,
};

emitter.on("login", (username) => {
  eventCnt.login++;
  console.log(`Hello ${username}, you have successfully logged in!`);
});

emitter.on("logout", (username) => {
  console.log(`See You Soon ${username}, you have successfully logged out!`);
  eventCnt.logout++;
});

emitter.on("purchase", (username, itemName) => {
  console.log(`${username} Purchased ${itemName}`);
  eventCnt.purchase++;
});

emitter.on("update", (username, field) => {
  console.log(`${username}, you have successfully updated ${field} details!`);
  eventCnt.update++;
});

emitter.on("summarize", () => {
  console.log(eventCnt);
});

emitter.emit("login", "yash");
emitter.emit("login", "virat");
emitter.emit("login", "deepak");

emitter.emit("logout", "yash");
emitter.emit("logout", "virat");
emitter.emit("logout", "deepak");

emitter.emit("purchase", "yash", "laptop");
emitter.emit("purchase", "virat","mobile");
emitter.emit("purchase", "deepak" , "mouse");

emitter.emit("update", "yash", "mobile number");
emitter.emit("update", "virat");
emitter.emit("update", "deepak");

emitter.emit("summarize");
