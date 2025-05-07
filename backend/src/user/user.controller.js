import { userService } from "./user.service.js";
import { hashpassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sanitize, sanitizeUserArray } from "../utils/sanitizeUser.js";
import { sendMail } from "../utils/sendmail.js";
import { sendForgotPasswordMail } from "../utils/resetpassword.js";
import { validateLogin, validateSignup } from "./validator.js";
import { ErrorResponse } from "../middlewares/error.js";
import { accountService } from "../account/account.service.js";


class UserController {
  //post controller to sign up
  async sign_up(req, res, next) {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
      const validationError = validateSignup({ firstName, lastName, email, phoneNumber, password })

      if (validationError) {
        return next(new ErrorResponse(validationError.message, validationError.status));
      }

      const userEmailExists = await userService.getUserByEmail(email);
      const userNumExists = await userService.getUserByPhoneNumber(phoneNumber);
  
      if (userEmailExists || userNumExists) {
        return next(new ErrorResponse('User with email or phone number already exist', 409));
      }
      
      // hash the password before saving to the database
      const hashedpassword = await hashpassword(password);
      
      // create the new user in the database
      const newUser = await userService.createUser(firstName,lastName,email,phoneNumber,hashedpassword);
        
      // await sendMail(newUser);
  
      //generate jwt and save to cookie
      generateToken(newUser.id, res);
  
      return res.status(201).json({
        message: 'User created successfully',
        data: {
          id: newUser.id,
          firstName: newUser.firstname,
          lastName: newUser.lastname,
          phoneNumber: newUser.phonenumber,
          email: newUser.email
        }
      });
    } catch (error) {
      return next(error);
    }
  };


  // post controller to login
 async login(req, res, next) {
  const { email, password } = req.body;
  try {
    const validationError = validateLogin({ email, password });

    if(validationError){
      return next(new ErrorResponse(validationError.message, validationError.status))
    }

    //checking for email
    const user = await userService.getUserByEmail(email);
    
    if (!user) {      
      return next(new ErrorResponse('Invalid credentials', 404));
    }

    //checking if password match
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 403));
    }

    //generate jwt and save to cookie
    generateToken(user.id, res);

    return res.status(200).json({
      message: 'Login successful',
      data: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        phoneNumber: user.phonenumber,
        email: user.email
      }
    });
  } catch (error) {
    return next(error)
  }
};

//logout controller
 async logout (req, res, next) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: 'strict'
    });
    return res.status(200).json({ message: 'Logout out successfully'});
  } catch (error) {
    return next(error);
  }
};

//get all users controller
 async getAllUsers(req, res, next) {
  try {
    const users = await userService.getUsers();

    if (users.length <= 0) {
      return next(new ErrorResponse('No user found',404))
    }

    return res.status(200).json({
      message: 'All users',
      data: sanitizeUserArray(users)
    });
  } catch (error) {
    return next(error)
  };
};

//get user by id controller
async userById(req, res, next) {
  try {
    const { id } = req.params;
    const [user] = await userService.getUserById(id);

    if (!user) return next(new ErrorResponse('No user found', 404));

    return res.status(200).json({
      data: sanitize(user),
    });
  } catch (error) {
    return next(error)
  }
};

//delete user by id controller
async deleteUserById(req, res, next) {
  try {
    const { id } = req.params;
    const [user] = await userService.removeUserById(id);
    if (!user) {
      return next(new ErrorResponse('Invalid user'))
    }
    return res.status(200).json({
      message: 'Delete successfull'
    });
  } catch (error) {
   return next(error)
  }
};

// //get user accounts controller
// static async getUserAccounts(req, res, next) {
//   try {
//     const user = req.user;

//     if (!user) {
//       return next(new ErrorResponse('You are not logged in', 401));
//     }

//     const accounts = await UserServices.getAccount(user.id);

//     if (!accounts || accounts.length === 0) {
//       return next(new ErrorResponse('No account found', 404));
//     }

//     return res.status(200).json({
//       accounts: accounts
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

//email verification
async userVerify(req, res, next) {
  const token = req.query.token;

  if (!token) {
    return next(new ErrorResponse('You are not authorized', 401))
  }

  const user = await userService.getUserByToken(token);

  if (!user) {
   return next(new ErrorResponse('Invalid token', 401))
  }

  if (user.isVerified) return next(new ErrorResponse('User already verified', 400))

  // await Services.verifyuser(user.id);

  console.log("user account verified");

  return res.status(200).json({
    message: "Verification successful",
  });
};

// Check for authenticated users
async checkAuth(req, res, next) {
  const user = req.user;
  try {
    if (!user) {
      return next(new ErrorResponse('User not authenticated', 401));
    };

    const [accountDetails] = await accountService.getAccountByUserId(user.id);
    
    if (!accountDetails) {
      return next(new ErrorResponse('This user do not have an account', 400));
    }
   
    return res.status(200).json({
      message: 'User authenticated',
      data: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        phoneNumber: user.phonenumber,
        email: user.email,
        acctNumber: accountDetails.acctnumber,
        currency: accountDetails.currency,
        balance: accountDetails.balance,
        type: accountDetails.type
      }
    });
  } catch (error) {
    return next(error)
  }
};
};

export const userController = new UserController();
// //forgot password
// export const forgotPassword = async (req, res) => {

//     try {

//     const token = req.query.token;
//     const { email } = req.body;

//     const [user] = await getUserByEmail(email)
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' })
//         }

// //Generate reset token and save it to the database

//         await updateUserPassword(email);

// //send email with link
//         await sendForgotPasswordMail(user)

//         return res.status(200).json({ message: `Password reset link sent to your mail`})

//     } catch(error) {
//         console.log('Error during forgot password', error);
//         return res.status(500).json({
//             mesage: "internal server error"
//         })
//     }

// }

// //reset password controller
// export const resetPassword = async (req, res) => {
//     const { newPassword } = req.body;
//     const token = req.params.token;

//     try {

//         const user = await veriftyPasswordToken(token)

//         if(!user) {
//             return res.status(400).json({ message: `Invalid or expired token or user not found`});
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         const userResult = await changePassword(user.id, hashedPassword)
//         if (!userResult) return res.status(400).json({ message: `Failed to reset password. User not found`})

//         const accessToken = generateToken(sanitize(user))

//         return res.status(200).json({
//             message: `Password reset successful`,
//             token: accessToken

//         })
//         } catch (error) {
//         console.log('Error resetting password',error);
//         return res.status(500).json({
//             mesage: "internal server error"
//         })
//     }
// }
