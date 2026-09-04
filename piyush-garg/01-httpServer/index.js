const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  // console.log(req.headers);
  // console.log("New Request Received!");
  if (req.url === "/favicon.ico") return res.end("");

  const log = `${Date.now()} : ${req.method} ${req.url} New Request Received✅ \n`;
  const myUrl = url.parse(req.url, true);
  // console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    if (err) console.error(err.message);
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome To Home Page");
        break;
      case "/about":
        const name = myUrl.query.name;
        res.end(`Hi, ${name}`);
        break;
      default:
        res.end("Error 404 Not Found");
    }
  });
  // res.end("Hello From Server");
});

server.listen(8000, () => {
  console.log("Server Started! ✅ ");
});


