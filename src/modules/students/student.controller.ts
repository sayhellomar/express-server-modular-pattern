import type { Request, Response } from "express";
import { studentService } from "./student.service";

async function createStudent(req: Request, res: Response) {
    try {
        const result = await studentService.createStudentToDB(req.body);
        res.status(201).json({
            success: true,
            message: "Created successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const studentController = {
    createStudent,
};
