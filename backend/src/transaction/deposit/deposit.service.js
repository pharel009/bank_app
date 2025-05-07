import { executeQuery } from "../../config/database.js";

class DepositServices {
//function to make a deposit into a user's account
    async makeDeposit(receiverAccountNum, amount) {
        try {
            await executeQuery('BEGIN')

            await executeQuery('update accounts set balance = balance + $1 where acctNumber = $2', [amount, receiverAccountNum])
            
            await executeQuery('COMMIT');

            // console.log('Deposit successful');
        } catch (error) {   
            await executeQuery('rollback')
            console.error('Deposit failed, transaction rolled back');
            throw new Error(error)
        }
    }

    //function to post to deposits table
    async postDeposit (depositorId, receiverAccountNum, amount) {
        try {        
            const query = `INSERT INTO deposits (userId, acctNumber, amount) VALUES ($1, $2, $3) RETURNING *`;
            const result = await executeQuery(query, [depositorId, receiverAccountNum, amount]);
            return result;
        } catch (error) {
            throw new Error(error)
        }

    };
}

export const depositService = new DepositServices();