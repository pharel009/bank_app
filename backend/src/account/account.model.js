import { executeQuery } from "../config/database.js";

//account table
export const accountTable = async () => {
    const query = `
    CREATE TABLE  IF NOT EXISTS accounts (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID,
        FOREIGN KEY (userId) REFERENCES users(id),
        acctNumber VARCHAR(10) UNIQUE NOT NULL,
        currency VARCHAR(3) NOT NULL CHECK(currency IN ('USD', 'NGN')),
        balance NUMERIC(10,2) DEFAULT 0.00 NOT NULL CHECK(balance >=0),
        type VARCHAR(10) NOT NULL CHECK(type IN ('savings', 'current')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

        try {
            await executeQuery(query);
            console.log("Accounts table created");
        } catch (error) {
            console.error("Error creating accounts table", error);
    }
    
};