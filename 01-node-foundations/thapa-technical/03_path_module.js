const path = require("path");
console.log(__dirname);
console.log(__filename);

const filePath = path.join("folder", "random.txt");
console.log(filePath);

const parseData = path.parse(filePath);
const resData = path.resolve(filePath);
const extName = path.extname(filePath);
const baseName = path.basename(filePath);
const dirname = path.dirname(filePath);
console.log({parseData,resData,extName,baseName,dirname});
