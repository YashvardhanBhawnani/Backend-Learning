const fsPromise = require("fs/promises");
const fileName = "testPromises.txt";
const delFileName = "promisesDel.txt";

// printing all files in the directory
const file = __dirname;
fsPromise
  .readdir(file)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// Writing to a File
const writeFile = fsPromise
  .writeFile(
    fileName,
    "This is Written Usimg Asynchronous File System Module",
    "utf-8",
  )
  .then((data) => console.log("File Added Successfully!"))
  .catch((err) => console.error("Error Writing to File : ", err));

// Reading a File
const readFile = fsPromise
  .readFile(fileName, "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.error("Error Reading File : ", err));

// Append to File
const appendFile = fsPromise
  .appendFile(
    fileName,
    "\nThis is Appended Using Promises File System Module",
    "utf-8",
  )
  .then((data) => console.log("File Appended Successfully!"))
  .catch((err) => console.error("Error Writing to File : ", err));

// Delete a File
const delFile = fsPromise
  .unlink(delFileName)
  .then(console.log("File Deleted Successfully!"))
  .catch((err) => console.error("Error Deleting File :", err));