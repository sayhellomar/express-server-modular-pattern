import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { LoginPayload } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";

async function loginStudentToDB(payload: LoginPayload) {
    const { email, password } = payload;
    const student = await pool.query(
        `
        SELECT * FROM students
        WHERE email = $1
    `,
        [email],
    );

    // Find the student if exists

    if (student.rowCount === 0) {
        throw new Error("Student not found");
    }

    // If student found check the password
    const isPasswordMatch = await bcrypt.compare(
        password,
        student.rows[0].password,
    );

    if (email !== student.rows[0].email || !isPasswordMatch) {
        throw new Error("Wrong Credentials");
    }

    if (!student.rows[0].is_active) {
        throw new Error("Your account is blocked");
    }

    const authPayload = {
        id: student.rows[0].id,
        name: student.rows[0].name,
        email: student.rows[0].email,
        is_active: student.rows[0].is_active,
        role: student.rows[0].role,
    };

    const accessToken = jwt.sign(
        authPayload,
        `${process.env.JWT_ACCESS_TOKEN_KEY}`,
        {
            expiresIn: "1h",
        },
    );

    const refreshToken = jwt.sign(
        authPayload,
        `${process.env.JWT_REFRESH_TOKEN_KEY}`,
        {
            expiresIn: "10d",
        },
    );

    delete student.rows[0].password;

    return {
        accessToken,
        refreshToken,
        student: student.rows[0],
    };
}

async function refreshGenerateAccessToken(token: string) {
    if (!token) {
        throw new Error("Unauthorized access");
    }

    const decoded = jwt.verify(
        token,
        `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    ) as JwtPayload;

    const student = await pool.query(
        `
        SELECT * FROM students
        WHERE email = $1
    `,
        [decoded.email],
    );

    if (student.rowCount === 0) {
        throw new Error("Student not found");
    }

    if (!student.rows[0].is_active) {
        throw new Error("Account blocked");
    }

    const authPayload = {
        id: student.rows[0].id,
        name: student.rows[0].name,
        email: student.rows[0].email,
        is_active: student.rows[0].is_active,
        role: student.rows[0].role,
    };

    const accessToken = jwt.sign(
        authPayload,
        `${process.env.JWT_ACCESS_TOKEN_KEY}`,
        {
            expiresIn: "1h",
        },
    );

    return { accessToken };
}

export const authService = {
    loginStudentToDB,
    refreshGenerateAccessToken,
};
