import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileCreate = () => {
  rl.question("Enter The File Name : ", (fname) => {
    rl.question("Enter The Content For The File : ", (content) => {
      fs.writeFile(`${fname}.txt`, content, (err) => {
        err
          ? console.log("Error Writing To File", err.message)
          : console.log(`File ${fname}.txt created successfully!`);
        rl.close();
      });
    });
  });
};
fileCreate();
