// import * as workerService from "../services/workerService"
import express from "express";
import { config as dotenvConfig } from "dotenv";
import Stripe from "stripe";
dotenvConfig();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}?success=true`,
    cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
  });

  res.status(200).json({ url: session.url });
});

// create webhook endpoint
// router.post("/webhook", async (req, res) => {
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       req.headers["stripe-signature"],
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       const session = event.data.object;
//       // Fulfill the purchase...
//       console.log("Payment was successful!");
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.json({ received: true });
// });
