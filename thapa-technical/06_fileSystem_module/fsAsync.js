const fs = require("fs");
const fileName = "testAsync.txt";

// Writing to a File
// const writeFile = fs.writeFile(
//   fileName,
//   "This is Written Usimg Asynchronous File System Module",
//   "utf-8",
//   (err) => {
//     if (err) console.error(err);
//     else console.log("File Saved");
//   },
// );
// console.log(writeFile);

// Reading a File
// const readFile = fs.readFile(fileName, "utf-8", (err, data) => {
//   if (err) console.error(err);
//   else console.log(data);
// });
// console.log(readFile);

// Append to File
// const appendFile = fs.appendFile(
//   fileName,
//   "\nThis is added using appendFile Method",
//   "utf-8",
//   (err) => {
//     if (err) console.error(err);
//     else console.log("File Saved");
//   },
// );
// console.log(appendFile);

//Deleting a File
const delFile = fs.unlink(fileName, (err) => {
  if (err) console.error(err);
  else console.log("Deleted Successfully!");
});
console.log(delFile);