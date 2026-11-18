import { pool } from "../../db";
import type { Profile } from "./profile.interface";

async function createProfileToDB(payload: Profile) {
    const { student_id, bio, address, phone, father_name, mother_name } =
        payload;

    const user = await pool.query(
        `
        SELECT * FROM users WHERE id = $1
    `,
        [student_id],
    );

    if (user.rowCount === 0) {
        throw new Error("Student not found");
    }

    const result = await pool.query(
        `
        INSERT INTO profiles (student_id, bio, address, phone, father_name, mother_name)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
        [student_id, bio, address, phone, father_name, mother_name],
    );

    return result;
}

export const profileService = {
    createProfileToDB,
};
