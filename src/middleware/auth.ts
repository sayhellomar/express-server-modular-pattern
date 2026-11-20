import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { Roles } from "../types";

export default function auth(...roles: Roles[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            const secretKey = process.env.JWT_SECRET_KEY;
            if (!token) {
                return sendResponse(
                    res,
                    401,
                    false,
                    "Unauthorized access denied",
                );
            }

            const decoded = jwt.verify(
                token as string,
                secretKey as string,
            ) as JwtPayload;

            const student = await pool.query(
                `
            SELECT id, name, email, role, is_active FROM students
            WHERE email = $1 
        `,
                [decoded.email],
            );

            if (student.rowCount === 0) {
                return sendResponse(res, 404, false, "Invalid authentication");
            }

            if (!student.rows[0].is_active) {
                return sendResponse(
                    res,
                    403,
                    false,
                    "Your account is inactive",
                );
            }

            if (roles.length && !roles.includes(student.rows[0].role)) {
                return sendResponse(
                    res,
                    401,
                    false,
                    "Unauthorized access denied",
                );
            }

            req.user = decoded;

            next();
        } catch (error) {
            throw error;
        }
    };
}
