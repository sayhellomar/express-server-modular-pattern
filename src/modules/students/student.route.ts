import { Router } from "express";
import { studentController } from "./student.controller";
import auth from "../../middleware/auth";

const router = Router();

// "/api/v1/students"
router.post("/", studentController.createStudent);
router.get("/", auth, studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.patch("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export const studentRoute = router;
