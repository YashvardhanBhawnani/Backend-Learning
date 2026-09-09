import https from "https";
import chalk from "chalk";

const getJoke = () => {
  const url = "https://official-joke-api.appspot.com/jokes/random";

  https.get(url, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      const joke = JSON.parse(data);
      console.log(`Here is A Random ${joke.type} Joke`);
      console.log(chalk.yellow(`${joke.setup}`));
      console.log(chalk.black.bgCyan.bold(`${joke.punchline}`));
    });

    resp.on("error", (err) =>
      console.log(`Error Fetching the Joke : ${err.message}`),
    );
  });
};
getJoke();
