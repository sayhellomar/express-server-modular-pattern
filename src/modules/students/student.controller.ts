import type { Request, Response } from "express";
import { studentService } from "./student.service";
import sendResponse from "../../utils/sendResponse";

async function createStudent(req: Request, res: Response) {
    try {
        const result = await studentService.createStudentToDB(req.body);
        sendResponse(res, 201, true, "Created successfully", result.rows[0]);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function getStudents(req: Request, res: Response) {
    try {
        const result = await studentService.getStudentsFromDB();
        sendResponse(res, 200, true, "Success", result.rows);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function getStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await studentService.getStudentFromDB(id as string);
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "Student not found");
        }
        sendResponse(res, 200, true, "Success", result.rows[0]);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message, error);
    }
}

async function updateStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await studentService.updateStudentToDB(
            req?.body,
            id as string,
        );
        if ("email" in req?.body) {
            return sendResponse(res, 500, false, "Email update is not allowed");
        }
        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "Student not found");
        }
        sendResponse(res, 200, true, "Updated successfully", result.rows[0]);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

async function deleteStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await studentService.deleteStudentFromDB(id as string);

        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "Student not found");
        }

        sendResponse(res, 200, true, "Deleted successfully");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
}

export const studentController = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
};
