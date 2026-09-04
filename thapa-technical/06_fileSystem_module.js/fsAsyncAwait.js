const fs = require("fs/promises");
const fileName = "testAsyncAwait.txt";
const delFileName = "AsyncAwaitDel.txt";

// writing to file
// const writeFile = async () => {
//   try {
//     await fs.writeFile(
//       fileName,
//       "This is written using async await fs module.",
//       "utf-8",
//     );
//     console.log("File Created Successfully!");
//   } catch (err) {
//     console.error(err);
//   }
// };
// writeFile();

// reading a file
// const readFile = async () => {
//   try {
//     const data = await fs.readFile(fileName, "utf-8");
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };
// readFile();

// append a file
// const appendFile = async () => {
//   try {
//     await fs.appendFile(
//       fileName,
//       "\nThis is appended using async await fs module.",
//       "utf-8",
//     );
//     console.log("File appended Successfully!");
//   } catch (err) {
//     console.error(err);
//   }
// };
// appendFile();

// deleting a file
const delFile = async () => {
  try {
    await fs.unlink(delFileName);
    console.log("File Deleted Successfully!");
  } catch (err) {
    console.error(err);
  }
};
delFile();