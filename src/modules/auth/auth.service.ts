import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { AuthPayload } from "./auth.interface";
import jwt from "jsonwebtoken";

async function loginUserToDB(payload: AuthPayload) {
    const { email, password } = payload;
    const user = await pool.query(
        `
        SELECT * FROM students
        WHERE email = $1
    `,
        [email],
    );

    // Find the user if exists

    if (user.rowCount === 0) {
        throw new Error("User not found");
    }

    // If user found check the password
    const isPasswordMatch = await bcrypt.compare(
        password,
        user.rows[0].password,
    );

    if (email !== user.rows[0].email || !isPasswordMatch) {
        throw new Error("Wrong Credentials");
    }

    if (!user.rows[0].is_active) {
        throw new Error("Your account is blocked");
    }

    const authPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    };

    const accessToken = jwt.sign(authPayload, `${process.env.JWT_SECRET_KEY}`, {
        expiresIn: "1d",
    });

    delete user.rows[0].password;

    return {
        accessToken,
        user: user.rows[0],
    };
}

export const authService = {
    loginUserToDB,
};
