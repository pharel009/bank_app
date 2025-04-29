import { NavLink } from "react-router-dom";
import { FaPiggyBank,FaMoneyBill, FaCreditCard, FaLandmark } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const {user} = useAuthContext();

    return ( 
        <>
            <div className="account-details">
                {user && (
                    <h3>{user?.currency} {user?.balance}</h3>
                )}
                
                <div>
                    <NavLink to="/create-account">Get instant acccount number</NavLink>
                </div>
            </div>

            <div className="transactions">
                <div>
                    <NavLink to="/deposit">
                    <span><FaPiggyBank /></span>
                     <p>Deposit</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/transfer">
                    <span><FaMoneyBill /></span> 
                        <p>Transfer</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/withdrawal">
                    <span><FaCreditCard /></span>
                     <p>Withdraw</p>
                    </NavLink>
                </div>
            </div>

            <div className="number">
                <div>
                    <span><FaLandmark /></span>
                    {user && (
                       <h1 style={{fontStyle: 'oblique'}}>{user?.acctNumber}</h1>
                    )}
                </div>    
            </div>
        </>
     );
};
 
export default Home;