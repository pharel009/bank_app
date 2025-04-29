import validator from "validator";

//transfer validator
export const validateTransfer = ({ receiverAccountNum, amount }) => {
    if(!receiverAccountNum || !amount) {
        return { message: 'Fill all fields', status: 400 }
    }

    if(!validator.isLength(receiverAccountNum, { min: 10 })) {
        return { message: 'Account number must be at 10 digits', status: 400 }
    }

    if(typeof amount !== 'number' || amount < 50) {
        return { message: 'Cannot transfer less than 50', status: 400 }
    }

    return null;
};