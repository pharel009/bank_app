import { DepositServices } from "./deposit.service.js";
import { validateDeposit } from "./deposit.validator.js";
import { UserServices } from "../../user/user.service.js";
import { AccountServices } from "../../account/account.service.js";
import { ErrorResponse } from "../../middlewares/error.js";

export class DepositController {
  static async deposit(req, res, next) {
    const depositorId = req.user.id;
    const { receiverAccountNum, amount } = req.body;
    try {
      const validateError = validateDeposit({ receiverAccountNum, amount });
      if (validateError) {
        return next(new ErrorResponse(validateError.message, validateError.status))     
      };

      //check if depositor exist
      const depositorExist = await UserServices.getUserById(depositorId);
      if (!depositorExist || depositorExist.length <= 0) {
        return next(new ErrorResponse("Depositor not found", 404));
      }

      //check if receiver account exist
      const [receiverAccount] = await AccountServices.getAccountNumber(receiverAccountNum);
    
      if (!receiverAccount) {
        return next(new ErrorResponse("Invalid receiver", 404));
      }

      //make the deposit
      await DepositServices.makeDeposit(receiverAccountNum, amount);

      //post deposit entry to the databse
      const account = await DepositServices.postDeposit(depositorId,receiverAccountNum,amount);

      return res.status(200).json({
        message: "Deposit successfully made!!!",
        account
      });
    } catch (error) {
      return next(error);
    }
  }
};
