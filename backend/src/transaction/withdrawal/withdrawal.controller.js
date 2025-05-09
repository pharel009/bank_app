import { withdrawalService } from "./withdrawal.service.js";
import { validateWithdrawal } from "./withdrawal.validator.js";
import { accountService } from "../../account/account.service.js";
import { ErrorResponse } from "../../middlewares/error.js";


class WithdrawalController {
    async withdrawal(req, res, next) {
        const user = req.user;
        const { accountNumber, amount } = req.body;
        try {
            const validateError = validateWithdrawal({ accountNumber, amount});
            if(validateError) {
                return next(new ErrorResponse(validateError.message, validateError.status))
            }
   
            const [withdrawAccount] = await accountService.getAccountNumber(accountNumber);

            const account = withdrawAccount;
  
            if (!account || !account.userid) {
                return next(new ErrorResponse('Invalid account', 404))
            };
    
            if (parseFloat(account.balance) < amount){
                return next(new ErrorResponse('Insufficient funds', 403))
            }
            if (account.userid.trim() !== user.id.trim()) {
                return next(new ErrorResponse('Unauthorized ueser', 401))
            }

            await withdrawalService.makeWithdrawal(accountNumber, amount)
    
            const withdrawal = await withdrawalService.postWithdrawal(accountNumber, amount);
    
            return res.status(200).json({
                message: 'Withdrawal successful!!!',
                withdrawal
            })
        } catch (error) {
            return next(error)
        }
    };
};

export const withdrawalController = new WithdrawalController();
