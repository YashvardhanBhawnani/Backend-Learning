// Named Export
/* export const add = (a, b) => {
  return a + b;
};
export const sub = (a, b) => {
  return a - b;
};
export const mult = (a, b) => {
  return a * b;
};
export const div = (a, b) => {
  return a / b;
}; */

const add = (a, b) => {
  return a + b;
};
const sub = (a, b) => {
  return a - b;
}
const mult = (a, b) => {
  return a * b;
};
const div = (a, b) => {
  return a / b;
};

// aggregated export
export { add, sub, mult, div };

// default export only one can be expoerted  
// export default sub;