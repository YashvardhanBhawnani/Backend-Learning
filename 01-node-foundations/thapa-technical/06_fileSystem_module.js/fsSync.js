const fs = require("fs");
const fileName = "syncDel.txt";

// Writing to a File

// const writeFile = fs.writeFileSync(fileName, "This is Written Usimg Synchronous File System Module", 'utf-8');
// console.log(writeFile);

// Reading a File

// const readFile = fs.readFileSync(fileName,'utf-8');
// console.log(readFile);

// Append to File

// const appendFile = fs.appendFileSync(fileName, "This is added using appendFileSync Method",'utf-8');
// console.log(appendFile);

// Delete a file

const delFile = fs.unlinkSync(fileName);
console.log(delFile);