import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});

export default async function initDB() {
    try {
        // Create students table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200),
                email VARCHAR(200) NOT NULL,
                password VARCHAR(255) NOT NULL,
                age SMALLINT,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);

        // Create students profile
        await pool.query(`
            CREATE TABLE IF NOT EXISTS profiles (
                id SERIAL PRIMARY KEY,
                student_id INT UNIQUE REFERENCES students(id) ON DELETE CASCADE,
                bio TEXT,
                address TEXT,
                phone VARCHAR(15),
                father_name VARCHAR(200),
                mother_name VARCHAR(200),
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);
        console.log("Database Connected!!");
    } catch (error) {
        console.log(error);
    }
}
