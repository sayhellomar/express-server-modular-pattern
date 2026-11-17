import { Router } from "express";
import { studentController } from "./student.controller";

const router = Router();

// "/api/v1/students"
router.post("/", studentController.createStudent);

export const studentRoute = router;
