import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});

export default async function initDB() {
    try {
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
        console.log("Database Connected!!");
    } catch (error) {
        console.log(error);
    }
}
