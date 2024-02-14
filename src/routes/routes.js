import express from "express";
const router = express.Router();

// /api
router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// /api/*
router.use("/stripe", import("../controllers/stripeController"));
router.use("/reportcard", import("../controllers/reportCardController"));
router.use("/students", import("../controllers/studentContoller"));
router.use("/users", import("../controllers/userController"));
router.use("/classes", import("../controllers/classesController"));

export default router;
