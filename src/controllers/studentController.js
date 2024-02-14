import * as studentService from "../services/studentService.js";
import express from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
const router = express.Router();

router.post("/", async (req, res) => {
  const student = req.body;
  const studentId = await studentService.createStudent(student);
  res.send(studentId);
});

router.get("/:id", async (req, res) => {
  const student = await studentService.getStudent(req.params.id);
  res.send(student);
});

router.get("/", async (req, res) => {
  const students = await studentService.getStudents();
  res.send(students);
});

router.put("/:id", async (req, res) => {
  const student = req.body;
  const studentId = await studentService.updateStudent(req.params.id, student);
  res.send(studentId);
});

router.delete("/:id", async (req, res) => {
  const studentId = await studentService.deleteStudent(req.params.id);
  res.send(studentId);
});

export default router;
