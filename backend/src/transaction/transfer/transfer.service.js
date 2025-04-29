import { executeQuery } from "../../config/database.js";


export class TransferServices {
//function to make transfer
static async makeTransfer(senderAccountNum,  receiverAccountNum, senderAmount, recieverAmount) {
    try {        
        await executeQuery('BEGIN')

        await executeQuery('update accounts set balance = balance - $1 where acctNumber = $2', [senderAmount, senderAccountNum])

        await executeQuery('update accounts set balance = balance + $1 where acctNumber = $2', [recieverAmount, receiverAccountNum])

        await  executeQuery('COMMIT');

        //console.log('transfer successful')

    } catch (error) {
        await executeQuery('rollback')
        console.error('Transfer failed, transaction rolled back')
        throw new Error(error)
    }

};

//function to post to transfers table
static async postTransfer(senderAccountNum, receiverAccountNum, amount) {
    try {        
        const query = `INSERT INTO transfers (fromAccountNumber, toAccountNumber, amount) VALUES ($1, $2, $3) RETURNING *`;
        const result = await executeQuery(query, [senderAccountNum, receiverAccountNum, amount])
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

};
