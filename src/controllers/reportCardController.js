import * as reportCardService from "../services/reportCardService.js";
import express from "express";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const router = express.Router();

router.post("/generateStrengthsNextSteps", async (req, res) => {
  const completion = await reportCardService.generateStrengthsNextSteps(req.body);
  res.send(completion);
});

export default router;
