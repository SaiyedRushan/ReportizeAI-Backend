import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import router from "./src/routes/routes.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import nodemailer from "nodemailer";
import sanitize from "sanitize";

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
app.use(sanitize.middleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-email", async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "mailtrap@demomailtrap.com",
      to: "rushan52@gmail.com",
      subject: `Email from ${req.bodyString("name")} : ${req.bodyEmail("email")}`,
      text: req.bodyString("message"),
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// This is the middleware that will require authentication for all routes under /api and also parses the jwt token and populates the req.auth object
app.use("/api", ClerkExpressRequireAuth(), router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
