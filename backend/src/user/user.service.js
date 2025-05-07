import { executeQuery } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { generateVerificationToken } from "../utils/jwt.js";

class UserServices {
    //create user query
  async createUser(firstName, lastName, email,phoneNumber, password) {
    try {
        const userId = uuidv4();
        const verificationToken = generateVerificationToken();
        const query = `INSERT INTO users (Id, firstName, lastName, email, phoneNumber, password, verificationToken) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
               
        const result = await executeQuery(query, [userId, firstName, lastName, email,phoneNumber, password, verificationToken]);

        return result[0];
    } catch (error) {
        throw new Error(error)
    }
};

//get users by email query
    async getUserByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = $1`
            const result = await executeQuery(query, [email]);
            return result[0];
        } catch (error) {
            throw new Error(error);
        }
  };

  //get users by phone number
 async getUserByPhoneNumber(phonenumber) {
    try {
        const query = `SELECT * FROM users WHERE phoneNumber =$1`
        const result = await executeQuery(query, [phonenumber]);
        return result[0];
    } catch (error) {
        throw new Error(error)
    }
};

//get all users query
 async getUsers() {
    try {
        const query = `SELECT * FROM users ORDER BY id ASC`
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

//get single user by id query
 async getUserById(userId) {
    try{
        const query = `SELECT * FROM users WHERE Id = $1`;
        const result = await executeQuery(query, [userId]);
        return result[0];
    } catch (error) {
        throw new Error(error)
    }
};

//delete user by id query
 async removeUserById(userId) {
    try {
        const query = `DELETE FROM users WHERE id = $1 RETURNING *`
        const result = await executeQuery(query, [userId]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

// get usertoken
 async getUserByToken(token) {
    try {
        const query = `SELECT * FROM users WHERE verificationtoken = $1`;
        const [result] = await executeQuery(query, [token])
        return result;
    } catch (error) {
        throw new Error(error)
    }
};

// set verified to true 
 async verifyuser(userId) {
    try {
        const query = `UPDATE users SET isverified = true WHERE id = $1 RETURNING *`;
        const result = await executeQuery(query, [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

// add column to users table
 async altarTable () {
    try {
        const query1 = `alter table users add column isverify boolean default false`;
        const query2 = `alter table users add column verificationToken text`;
        await executeQuery(query1);
        await executeQuery(query2);
        console.log("Users table altered")
    } catch (error) {
        console.log("Users table failed to alter", error.message)
        throw new Error(error);
    }
}

 async addColumn () {
    const resetPassword = `alter table users add column reset_password varchar(225)`;
    const resetTokenExpiresAt = `alter table users add column reset_token_expires timestamp`;
    try {
        await executeQuery(resetPassword);
        await executeQuery(resetTokenExpiresAt);

    } catch (error) {
        throw new Error(error);
    }
}

};

export const userService = new UserServices();

// export const veriftyPasswordToken = async (token) => {
//     try{
//     const query = `
//     SELECT * FROM users WHERE reset_password = $1 AND reset_token_expires =! CURRENT_TIMESTAMP::timestamp`
    
//     const result = await executeQuery(query, [token]);
//     return result;
// } catch (error) {
//     throw new Error(error);
// }
// }

// // save reset token and expiry to the database
// export const updateUserPassword = async (email) => {
//     try {

//         const resetToken = generateVerificationToken();

//         console.log(resetToken);

//         const resetTokenExpires = new Date(Date.now() + 3600000);

//         const query = `UPDATE users SET reset_password = $1, reset_token_expires = $2 WHERE email = $3`

//         const result = await executeQuery(query, [resetToken, resetTokenExpires, email]);
        
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// //reset password and clear the the token from the database
// export const changePassword = async (userId, password) => {
//     try {
//         const query = `UPDATE users SET password = $1, reset_password = NULL, reset_token_expires = NULL WHERE id = $2`

//         const result = await executeQuery(query, [password, userId])
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// }