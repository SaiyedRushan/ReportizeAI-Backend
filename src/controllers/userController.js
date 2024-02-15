import * as userService from "../services/userService.js";
import express from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  const userId = await userService.createUser(user);
  res.send(userId);
});

router.put("/:id", async (req, res) => {
  const user = req.body;
  const userId = await userService.updateUser(req.params.id, user);
  res.send(userId);
});

router.get("/subscriptionInfo", async (req, res) => {
  console.log(req.auth);
  res.json(req.auth);
});

export default router;
