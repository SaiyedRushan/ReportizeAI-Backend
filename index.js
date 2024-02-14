import express from "express";
import { config as dotenvConfig } from "dotenv";
import router from "./src/routes/routes.js";
dotenvConfig();

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
