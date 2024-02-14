import express from "express";
import stripeController from "../controllers/stripeController.js";
import reportCardController from "../controllers/reportCardController.js";
import studentContoller from "../controllers/studentController.js";
import userController from "../controllers/userController.js";
// import classesController from "../controllers/classesController.js";

const router = express.Router();

// /api
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// /api/*
router.use("/stripe", stripeController);
router.use("/reportcard", reportCardController);
router.use("/students", studentContoller);
router.use("/users", userController);
// router.use("/classes", classesController);

export default router;
