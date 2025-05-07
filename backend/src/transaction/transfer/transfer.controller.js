import { transferService } from "./transfer.service.js";
import { validateTransfer } from "./transfer.validator.js";
import { converter } from "../../utils/converter.js";
import { accountService } from "../../account/account.service.js";
import { ErrorResponse } from "../../middlewares/error.js";


class TransferController {
    async  transfer(req, res, next) {
        const user = req.user;
        const { receiverAccountNum, amount } = req.body;
        try {        
            const validateError = validateTransfer({ receiverAccountNum, amount })        
            if(validateError) {
                return next(new ErrorResponse(validateError.message, validateError.status))
            };
    
            const [senderAcct] = await accountService.getAccountByUserId(user.id);
          
            if (!senderAcct){
                return next(new ErrorResponse('Sender not found', 404))
            };

            // Extract sender's account number
            const senderAccountNum = senderAcct.acctnumber;

            if (parseFloat(senderAcct.balance) < amount){
                return next(new ErrorResponse('Insufficient funds', 403))
            };
    
            if (senderAcct.userid !== user.id){
                return next(new ErrorResponse('Unauthorized user', 401))
            }

            const [recieverAcct] = await accountService.getAccountNumber(receiverAccountNum);
                    
            if (!recieverAcct){
                return next(new ErrorResponse('Receiver not found', 404))
            };
    
            if (senderAccountNum === receiverAccountNum) {
                return next(new ErrorResponse('Cannot send funds to same account', 409))
            }
            
            //currency converter
            let transferAmount = parseFloat(amount);
    
            if(senderAcct.currency != recieverAcct.currency) {
                transferAmount = await converter(senderAcct.currency, recieverAcct.currency, amount);
            }
            
            await transferService.makeTransfer(senderAccountNum, receiverAccountNum, amount, transferAmount);
    
            const trans = await transferService.postTransfer(senderAccountNum, receiverAccountNum, amount);
            
            return res.status(200).json({
                message: "Transfer successful!!!",
                trans
            })
    
    
        } catch (error) {
          return next(error)      
        }
    }
};

export const transferController = new TransferController();
