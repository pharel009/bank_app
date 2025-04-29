import { executeQuery } from "../config/database.js";

// users table
export const createUserTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50),
        email VARCHAR(100) UNIQUE NOT NULL,
        phoneNumber VARCHAR(11) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    try {
        await executeQuery(query);
        console.log("Users table created");
    } catch (error) {
        console.error("Error creating users table", error);
    }

}