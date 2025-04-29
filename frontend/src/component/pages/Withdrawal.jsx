import { useState } from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import { useAxios } from "../hooks/Axios/useAxios";
import styles from "../css/transactions.module.css"

const Withdrawal = () => {
const [withdrawInfo, setWithdrawInfo] = useState({
  accountNumber: "",
    amount: ""
  })

  const [successMessage, setSuccessMessage] = useState('');

  const { setAcct } = useAccountContext();
  const { error, loading, fetchData} = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawInfo(prev => ({...prev, [name]: value}));
  };

  const payload = {
    accountNumber: withdrawInfo.accountNumber,
    amount: parseFloat(withdrawInfo.amount)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await fetchData({
        url: '/withdrawal',
        method: 'POST',
        data: payload,
        withCredentials: true
      })

      if (data) {
        setAcct(data)
        setSuccessMessage(data.message);
      }

    } catch (error) {
      console.log("Error transfering funds: ", error.message)
    }
  };

  const validButton = withdrawInfo.accountNumber && withdrawInfo.amount

  return (
    <div className={styles.container}>
      <h2>Withdraw</h2>
      <div className={styles.receiverInput}>
              <label htmlFor="account">Account number:</label>
              <input
                name="accountNumber"
                value={withdrawInfo.accountNumber} 
                id="account"
                type="number" 
                placeholder="Enter 10 digits Account number"
                onChange={handleChange} 
              />
            </div>
      
            <div className={styles.receiverInput}>
              <label htmlFor="number">Amount:</label>
              <input
                name="amount"
                value={withdrawInfo.amount}
                id="number" 
                type="number" 
                placeholder="e.g. 100.00"
                onChange={handleChange} 
              />
            </div>
            <button onClick={handleSubmit} className={styles.btn} disabled={loading || !validButton}>
              {loading ? 'Processing' : 'Continue'}
            </button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
          </div>
        );
};

export default Withdrawal;
