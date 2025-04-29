import { useState } from "react";
import { useAxios } from "../hooks/Axios/useAxios";
import { useAccountContext } from "../hooks/useAccountContext";
import styles from "../css/transactions.module.css";


const Transfer = () => {
  const [transferInfo, setTransferInfo] = useState({
    receiverAccountNum: "",
    amount: ""
  })

  const [successMessage, setSuccessMessage] = useState("");

  const { setAcct} = useAccountContext();
  const { error, loading, fetchData} = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferInfo(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      receiverAccountNum: transferInfo.receiverAccountNum,
      amount: parseFloat(transferInfo.amount)
    };

    try {
      const { data } = await fetchData({
        url: '/transfer',
        method: 'POST',
        data: payload,
        withCredentials: true
      })
      if (data) {
        setAcct(data)
        setSuccessMessage(data.message)
      }
      console.log('response: ', data)
    } catch (error) {
      console.log("Error transfering funds: ", error.message)
    }
  };

  const validButton = transferInfo.receiverAccountNum && transferInfo.amount

  return (
    <div className={styles.container}>
      <h2>Make Transfer</h2>
      <div className={styles.receiverInput}>
        <label htmlFor="account">Recipient Account:</label>
        <input
          name="receiverAccountNum"
          value={transferInfo.receiverAccountNum} 
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
          value={transferInfo.amount}
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

export default Transfer;
