import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/pages/Home";
import Signup from "./component/pages/SignUp";
import Login from "./component/pages/Login";
import Deposit from "./component/pages/Deposit";
import Transfer from "./component/pages/Transfer";
import Withdrawal from "./component/pages/Withdrawal";
import CreateAccount from "./component/pages/CreateAccount";
import Layout from "./component/Layout/Layout";
import { useAuthContext } from "./component/hooks/useAuthContext";
import { NotFound } from "./component/pages/NotFound"
import { useEffect } from "react";
import { Loader } from "./component/common/Loader"

function App() {
  const { user, checkUser, loadingUser } = useAuthContext();

  useEffect(() => {
    checkUser();
  }, []);

  if (loadingUser) {
    return <Loader />
  }

  return (
    <>
      <Layout> 
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />

            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />

            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} /> 

            <Route path="/deposit" element={<Deposit />} />

            <Route path="/transfer" element={<Transfer />} />

            <Route path="/withdrawal" element={<Withdrawal />} />

            <Route path="/create-account" element={<CreateAccount />} /> 
            
            <Route path="*" element={<NotFound />} />

          </Routes>
      </Layout>
    </>
  );
}

export default App;
