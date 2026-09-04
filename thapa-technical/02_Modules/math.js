const add = (a,b) => {
  return a + b;
}
const sub = (a, b) => {
  return a - b;
}
const mult = (a, b) => {
  return a * b;
}
const div = (a, b) => {
  return a / b;
}
// console.log(add(31, 89));
// commonjs method
module.exports = {add,sub,mult,div};