import validator from 'validator';

export const validateSignup = ({ firstName, lastName, email, phoneNumber, password }) => {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        return { message: 'All fields are required', status: 400 };
    }
      
    if (!validator.isEmail(email)) {
        return { message: 'Ivalid email', status: 400 };
    }
      
    if (!validator.isLength(password, { min: 8 })) {
        return { message: 'Password must be at least 8 characters long', status: 400 };
    }
      
    if (!validator.isStrongPassword(password)) {
        return { message: 'Password must be a strong password.', status: 400 }; 
    }
      
    if (!validator.isNumeric(phoneNumber) || !validator.isLength(phoneNumber, { min: 11, max: 11 })) {
        return { message: 'Invalid Phone number format', status: 400 };
     }
     
    // return null if there is no error
    return null;
      
};


export const validateLogin = ({ email, password }) => {
    if (!email || !password) {
        return { message: 'All fields are required', status: 400 };
    }

    if (!validator.isEmail(email)) {
        return { message: 'Ivalid email', status: 400 };
    }

    return null;
};