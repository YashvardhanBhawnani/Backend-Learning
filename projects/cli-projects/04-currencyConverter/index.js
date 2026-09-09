import https from "https";
import readline from "readline";
import chalk from "chalk";
import "dotenv/config";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = process.env.EXCHANGE_API_KEY;
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

const convertCurr = (amt, rate) => {
  return (amt * rate).toFixed(2);
};

https.get(url, (resp) => {
  let data = "";

  resp.on("data", (chunk) => {
    data += chunk;
  });

  resp.on("end", () => {
    const rates = JSON.parse(data).conversion_rates;
    rl.question("Enter The Amount in INR : ", (amt) => {
      rl.question("Enter The Target Currency (e.g. USD,EUR,NPR) : ", (curr) => {
        const rate = rates[curr.toUpperCase()];
        rate
          ? console.log(
              chalk.black.bgCyan.bold(
                `${amt} is approximately ${convertCurr(amt, rate)} ${curr}`,
              ),
            )
          : console.log("Invalid Currency Code");
      });
    });
  });
});
