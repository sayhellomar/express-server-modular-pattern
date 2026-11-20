import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";

export default async function auth(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.headers.authorization;
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!token) {
        sendResponse(res, 401, false, "Unauthorized access denied");
    }

    const decoded = jwt.verify(
        token as string,
        secretKey as string,
    ) as JwtPayload;

    const student = await pool.query(
        `
        SELECT id, name, email, is_active FROM students
        WHERE email = $1 
    `,
        [decoded.email],
    );

    if (student.rowCount === 0) {
        sendResponse(res, 404, false, "Student not found");
    }

    if (!student.rows[0].is_active) {
        sendResponse(res, 403, false, "Forbidden");
    }

    req.user = decoded;

    next();
}
