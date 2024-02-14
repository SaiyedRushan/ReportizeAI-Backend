import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

router.use("/stripe", import("../controllers/stripeController"));
router.use("/reportcard", import("../controllers/reportCardController"));
router.use("/students", import("../controllers/studentContoller"));
router.use("/classes", import("../controllers/classesController"));

export default router;
