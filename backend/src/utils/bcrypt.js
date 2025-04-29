import bcrypt from "bcryptjs";

//function to hash password when creating a new user
export const hashpassword = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt)

    return hashedpassword;
};

//function to compare user password with the hashed password before login
export const comparePassword = async (password, hashedpassword) => {
    const isMatch = await bcrypt.compare(password, hashedpassword);
    return isMatch;
};



