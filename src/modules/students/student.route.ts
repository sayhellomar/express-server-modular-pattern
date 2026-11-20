import { Router } from "express";
import { studentController } from "./student.controller";
import auth from "../../middleware/auth";
import { userRole } from "../../types";

const router = Router();

// "/api/v1/students"
router.post("/", studentController.createStudent);
router.get(
    "/",
    auth(userRole.manager, userRole.leader),
    studentController.getStudents,
);
router.get(
    "/:id",
    auth(userRole.manager, userRole.leader),
    studentController.getStudent,
);
router.patch(
    "/:id",
    auth(userRole.manager, userRole.member),
    studentController.updateStudent,
);
router.delete(
    "/:id",
    auth(userRole.manager, userRole.member),
    studentController.deleteStudent,
);

export const studentRoute = router;
