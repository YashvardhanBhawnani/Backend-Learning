const crypto = require("crypto");

const randomBytes = crypto.randomBytes(8).toString("hex");
console.log(randomBytes);

const hashValue = crypto.createHash("sha256").update("yashvardhan bhawnani").digest("hex");
console.log(hashValue);