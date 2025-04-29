import { UserServices } from "../user/user.service.js";
import { uniqueAccountNumber } from "../utils/generateAccount.js";
import { AccountServices } from "./account.service.js";
import { ErrorResponse } from "../middlewares/error.js";
import { validateAccount } from "./account.validator.js";

export class AccountController {
  //create account and get acct number controller
  static async createAcount(req, res, next) {
    const userId = req.user.id; 
    const { currency, type } = req.body;
    try {
      const validationError = validateAccount({ currency, type });

      if (validationError) {
        return next(new ErrorResponse(validationError.message, validationError.status));    
      }

      const user = await UserServices.getUserById(userId);

      if (!user) {
        return next(new ErrorResponse("User not found", 404));
      }

      const userAccountExist = await AccountServices.getAccountByUserId(userId);
  
      if (userAccountExist.length > 0) {
        return next(new ErrorResponse('You already have an account with us', 409));
      }

      const accountNumber = await uniqueAccountNumber();      

      //save acccount to database
      const newAccountNumber = await AccountServices.createAcoount(userId, accountNumber, currency, type);

      return res.status(201).json({
        message: "Account created successfully",
        data: newAccountNumber,
      });
    } catch (error) {
      return next(error);
    }
  }

};
