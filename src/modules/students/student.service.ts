import { pool } from "../../db";
import type { Student } from "./student.interface";

// Post student
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

// Get all students
async function getStudentsFromDB() {
    const result = await pool.query(`
       SELECT * FROM students
    `);

    return result;
}

// Get a single student
async function getStudentFromDB(id: string) {
    const result = await pool.query(
        `
        SELECT * FROM students WHERE id = $1
    `,
        [id],
    );

    return result;
}

// Update a student
async function updateStudentToDB(payload: Student, id: string) {
    const { name, password, age, is_active } = payload;
    const result = await pool.query(
        `
       UPDATE students SET
        name = COALESCE($1, name),
        password = COALESCE($2, password), 
        age = COALESCE($3, age), 
        is_active = COALESCE($4, is_active),
        updated_at = now()
        WHERE id = $5
        RETURNING *
    `,
        [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
    );

    return result;
}

// Delete student
async function deleteStudentFromDB(id: string) {
    const result = await pool.query(
        `
        DELETE FROM students
        WHERE id = $1
    `,
        [id],
    );

    return result;
}

export const studentService = {
    createStudentToDB,
    getStudentsFromDB,
    getStudentFromDB,
    updateStudentToDB,
    deleteStudentFromDB,
};
