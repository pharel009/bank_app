import { executeQuery } from "../../config/database.js";

//withdrawal table
export const withdrawalTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS withdrawals (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        acctNumber VARCHAR(10) NOT NULL,
        amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
        withdrawalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (acctNumber) REFERENCES accounts(acctNumber)
    )`;

    try {
        await executeQuery(query);
        console.log("Withdrawals table created");
    } catch (error) {
        console.log("Error creating withdrawals table");
    }
}