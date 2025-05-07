import { executeQuery } from "../../config/database.js";

class WithdrawalServices {
//query to make withdrawal
static async makeWithdrawal(accountNumber, amount) {
    try {        
        await executeQuery('BEGIN')

        await executeQuery('update accounts set balance = balance - $1 where acctNumber = $2', [amount, accountNumber])

        await executeQuery('COMMIT');

        //console.log('Withdrawal successful');
    } catch (error) {   
        await executeQuery('rollback')
        console.error('Withdrawal failed, transaction rolled back');
        throw new Error(error)
    }
};

//query to post withdrawals table
static async postWithdrawal(accountNumber, amount) {
    try {        
        const query = `INSERT INTO withdrawals (acctNumber, amount) VALUES ($1, $2) RETURNING *`;
        const result = await executeQuery(query, [accountNumber, amount]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
};
};

export const withdrawalService = new WithdrawalServices();