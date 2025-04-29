import { useState } from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import { useAxios } from "../hooks/Axios/useAxios";


const CreateAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    currency: "NGN",
    type: "savings",
  });

  const { acct, setAcct } = useAccountContext();
  const { error, loading, fetchData } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await fetchData({
            url: '/accounts/create',
            method: 'POST',
            data: accountInfo,
            withCredentials: true
        })
        if(data.data){
            setAcct(data.data)
        }
    } catch (error) {
        console.log("Error opening account: ", error)
    }
  }
  return (
    <div className="account_container">
      <h1>Open Account</h1>
      <div className="drop_down">
        <label>Currency:</label>
        <select 
          value={accountInfo.currency}
          onChange={(e) => setAccountInfo({...accountInfo, currency: e.target.value})}
          className="select_1">
          <option value="NGN">NGN</option>
          <option value="USD">USD</option>
        </select>
        <br />
        <label>Account type:</label>
        <select
          value={accountInfo.type}
          onChange={(e) => setAccountInfo({...accountInfo, type: e.target.value})}
          >
          <option value="savings">savings</option>
          <option value="current">current</option>
        </select>
        </div>
       
        <button className="create_btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account' : 'Open account'}
        </button>
        
        <div>
        {acct?.type}-
        {acct && (
         acct?.acctnumber
        )}
        </div>
        {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateAccount;
