import { pool } from "../../db";
import type { Student } from "./student.interface";

async function createStudentToDB(payload: Student) {
    const { name, email, password, age } = payload;
    const result = await pool.query(
        `
        INSERT INTO students (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
    `,
        [name, email, password, age],
    );

    return result;
}
export const studentService = {
    createStudentToDB,
};
