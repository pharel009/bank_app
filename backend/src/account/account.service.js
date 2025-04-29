import { executeQuery } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";


export class AccountServices {
//query to create an account
static async createAcoount(userId, accountNumber, currency, type) {
    try {
        const query = `INSERT INTO accounts (id, userid, acctnumber, currency, type)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await executeQuery(query, [uuidv4(), userId, accountNumber, currency, type])
        return result[0];
    } catch (error) {
        throw new Error(error)
    }
};

//query to get account number 
static async getAccountNumber(accountNumber) {
    try {
        const query = `SELECT * FROM accounts WHERE acctNumber = $1`;
        const results = await executeQuery(query, [accountNumber])
        return results;
    } catch (error) {
        throw new Error(error);
    }
};

//get user accounts
static async getAccountByUserId(userId) {
    try {
        const query = `SELECT * FROM accounts WHERE userId = $1`;
        const results = await executeQuery(query, [userId])
        return results;
    } catch (error) {
        throw new Error(error);
    }
};

};






