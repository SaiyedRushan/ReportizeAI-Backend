import express from "express";
import { config as dotenvConfig } from "dotenv";
import router from "./src/routes/routes.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenvConfig();

const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// This is the middleware that will require authentication for all routes under /api and also parses the jwt token and populates the req.auth object
app.use("/api", ClerkExpressRequireAuth(), router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
