import validator from 'validator'

export const validateAccount = ({ currency, type }) => {
    if (!currency || !type) {
        return { message: 'All fields are required', status: 400}
    };

    if (!validator.isIn(currency, ['NGN', 'USD'])) {
        return { message: "Currenncy must be either 'NGN or 'USD'", status: 400 }
    };

    if (!validator.isIn(type, ['savings', 'current'])) {
        return { message: "Type must be either 'savings or 'current'", status: 400 }
    }

    return null;
};