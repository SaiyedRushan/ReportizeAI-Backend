import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import router from "./src/routes/routes.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenvConfig();

const app = express();
const port = 8080;

app.use(express.json());
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// This is the middleware that will require authentication for all routes under /api and also parses the jwt token and populates the req.auth object
app.use("/api", ClerkExpressRequireAuth(), router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
