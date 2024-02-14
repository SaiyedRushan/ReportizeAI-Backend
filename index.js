import express from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", import("./src/routes/routes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
