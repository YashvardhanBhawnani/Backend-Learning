import express from "express";
import userRouter from "./routes/userRouter.js";
import connectDb from "./config/dbConn.js";
import logReqRes from "./middlwares/middleware.js";

const app = express();
const PORT = 3000;

// Connection
const mongo_uri = "mongodb://127.0.0.1:27017/node_conn";
connectDb(mongo_uri).then(console.log("MongoDb Connected"));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server Started At Port 3000!"));
