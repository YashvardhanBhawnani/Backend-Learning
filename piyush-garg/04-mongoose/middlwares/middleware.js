import fs from "fs";

const logReqRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,
      (err, data) => {
        next();
      },
    );
  };
};
export default logReqRes;
