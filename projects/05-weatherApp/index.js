import readline from "readline/promises";
import "dotenv/config";

const apiKey = process.env.OPENWEATHER_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const resp = await fetch(url);

    if (!resp.ok)
      throw new Error("City Not Found. Please Check The City Name.");

    const weatherData = await resp.json();
    console.log("\nWeather Information");
    console.log(`City : ${weatherData.name}`);
    console.log(`Temparature : ${weatherData.main.temp}°C`);
    console.log(`Decscription : ${weatherData.weather[0].description}`);
    console.log(`Humidity : ${weatherData.main.humidity}`);
    console.log(`Wind Speed : ${weatherData.wind.speed}`);
  } catch (err) {
    console.log(err.message);
  }
};

const city = await rl.question("Enter The City Name To Get Its Weather : ");
await getWeather(city);
rl.close();