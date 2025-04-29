import validator from "validator";

//withdrawal validator
export const validateWithdrawal = ({ accountNumber, amount }) => {
    if(!accountNumber || !amount) {
        return { message: 'Fill all fields', status: 400 }
    }

    if(!validator.isLength(accountNumber, { min: 10 })) {
        return { message: 'Account number must be 10 digits', status: 400}
    }

    if(typeof amount !== 'number' || amount < 50) {
        return { message: 'Cannot with less than 50', status: 400}
    }

    return null;
};