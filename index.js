import express from "express";
import { config as dotenvConfig } from "dotenv";
import Stripe from "stripe";
import OpenAI from "openai";
import cors from "cors";
dotenvConfig();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = 8080;

app.use(express.json());

const openai = new OpenAI();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const YOUR_DOMAIN = "http://localhost:3000/dashboard";

app.post("/api/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1OjBJvIKkT3ruTrbIMvocNQ9",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.status(200).json({ url: session.url });
});

app.post("/api/report-card-comments", async (req, res) => {
  const strengths = req.body.strengths;
  const nextSteps = req.body.nextSteps;
  const grade = req.body.studentInfo.grade;
  const absent = req.body.studentInfo.absent;
  const late = req.body.studentInfo.late;
  const responsibility = req.body.studentInfo.responsibility;
  const organized = req.body.studentInfo.organized;
  const independent = req.body.studentInfo.independent;
  const collaboration = req.body.studentInfo.collaboration;
  const initiative = req.body.studentInfo.initiative;

  const prompt = `
  You are a teacher. Generate some comments about the students strengths and next steps. The student is in grade ${grade}. He is absent ${absent} days. He is late ${late} times. He is excellent in ${responsibility}. He is good in ${organized}. He is satisfactory in ${independent}. He needs improvement in ${collaboration}. He is excellent in taking ${initiative}.
  He needs improvement in the following things - ${nextSteps}. His strengths are - ${strengths}.`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 250,
  });
  console.log(completion.choices[0]?.message?.content);
  res.send(completion.choices[0]?.message?.content);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
