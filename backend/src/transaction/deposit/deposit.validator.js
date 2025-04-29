import validator from "validator";

//deposit validator
export const validateDeposit = ({ receiverAccountNum, amount }) => {
    if (!receiverAccountNum || !amount) {
        return { message: 'fill all fields', status: 400 }
    }
    if (!validator.isLength(receiverAccountNum, { min: 10 })) {
        return { message: 'Receiver account number must be 10 digits', status: 400}
    }

    if(typeof amount !== 'number' || amount < 50) {
        return { message: 'Cannot deposit less than 50', status: 400}
    }

    return null;
};