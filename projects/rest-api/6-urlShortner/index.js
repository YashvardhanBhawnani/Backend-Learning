import express from "express";
import urlRouter from "./routes/urlRouter.js";
import connectDb from "./config.js";
import { handleRedirectShortUrl } from "./controllers/urlController.js";

const app = express();
const PORT = 3000;

const mongo_uri = "mongodb://127.0.0.1:27017/url-shortner";
connectDb(mongo_uri).then(console.log("MongoDb Connected"));

app.use(express.json());
app.use("/url", urlRouter);
app.get("/:shortId", handleRedirectShortUrl);

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
