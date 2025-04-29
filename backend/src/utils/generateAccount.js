import { AccountServices } from "../account/account.service.js";

//function to create 10 digit account number
const generateAccountNumber = () => {
  const prefix = 250;
  const randomPart = Math.floor(1000000 + Math.random() * 9000000).toString();
  const accountNum = prefix + randomPart;
  return accountNum;
};

export const uniqueAccountNumber = async () => {
  let accountNumber = generateAccountNumber();
  let existingAccounts = await AccountServices.getAccountNumber(accountNumber);

  if (existingAccounts.length > 0) {
    accountNumber = generateAccountNumber();
    existingAccounts = await AccountServices.getAccountNumber(accountNumber);
  }

  return accountNumber;
};

//using your phone number to create account

// const accNum = user.phonenumber.slice(1)
// const [accExists] = await getAccountNumber(accNum);
// if (accExists) return res.status(409).json({
//     message: 'Account already exists!!!'
// })
