import { executeQuery } from "../../config/database.js";

//transfer table
export const transferTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS transfers (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        fromAccountNumber VARCHAR(10) NOT NULL,
        toAccountNumber VARCHAR(10) NOT NULL,
        amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
        transferDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fromAccountNumber) REFERENCES accounts(acctNumber),
        FOREIGN KEY (toAccountNumber) REFERENCES accounts(acctNumber)
    )`;

    try {
        await executeQuery(query);
        console.log("Transfers table created");
    } catch (error) {
        console.log("Error creating transfers table", error);
    }
};