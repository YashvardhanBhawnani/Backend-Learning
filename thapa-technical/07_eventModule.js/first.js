const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (args) =>
  console.log(`Hello! ${args.username} aged ${args.age} years.`),
);
emitter.emit("greet", { username: "Yashvardhan", age: 22 });