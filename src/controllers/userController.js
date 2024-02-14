import * as userService from "../services/userService";
import express from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  const userId = await userService.createUser(user);
  res.send(userId);
});

router.get("/:id", async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.send(users);
});

router.put("/:id", async (req, res) => {
  const user = req.body;
  const userId = await userService.updateUser(req.params.id, user);
  res.send(userId);
});

router.delete("/:id", async (req, res) => {
  const userId = await userService.deleteUser(req.params.id);
  res.send(userId);
});

export default router;
