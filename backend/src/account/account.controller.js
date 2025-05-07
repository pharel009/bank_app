import { userService } from "../user/user.service.js";
import { uniqueAccountNumber } from "../utils/generateAccount.js";
import { accountService } from "./account.service.js";
import { ErrorResponse } from "../middlewares/error.js";
import { validateAccount } from "./account.validator.js";

class AccountController {
  //create account and get acct number controller
  async createAcount(req, res, next) {
    const userId = req.user.id; 
    const { currency, type } = req.body;
    try {
      const validationError = validateAccount({ currency, type });

      if (validationError) {
        return next(new ErrorResponse(validationError.message, validationError.status));    
      }

      const user = await userService.getUserById(userId);

      if (!user) {
        return next(new ErrorResponse("User not found", 404));
      }

      const userAccountExist = await accountService.getAccountByUserId(userId);
  
      if (userAccountExist.length > 0) {
        return next(new ErrorResponse('You already have an account with us', 409));
      }

      const accountNumber = await uniqueAccountNumber();      

      //save acccount to database
      const newAccountNumber = await accountService.createAcoount(userId, accountNumber, currency, type);

      return res.status(201).json({
        message: "Account created successfully",
        data: newAccountNumber,
      });
    } catch (error) {
      return next(error);
    }
  }
};


export const accountController = new AccountController();