// import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { useAxios } from "../hooks/Axios/useAxios";
import { FormInput } from "../formInput/FormInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Signup = (props) => {
  //toggle password
  const [inputType, Icon, toggleVisibility] = usePasswordToggle();
  const { loading, error, fetchData } = useAxios();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  let template = {
    title: "Sign up",
    fields: [
      {type: "text", name: "firstName", placeholder: "First Name"},
      {type: "text", name: "lastName", placeholder: "last Name"},
      {type: "email", name: "email", placeholder: "Email"},
      {type: "number", name: "phoneNumber", placeholder: "phone number"},
      {type: inputType, name: "password", placeholder: "password"},
      {type: inputType, name: "confirmPassword", placeholder: "confirm password"},
    ]
  };
  //password match validator
  const [matchPasswordError, setMatchPasswordError] = useState(false);

  const validatePassword = (userInfo) => {
    if (userInfo.password !== userInfo.confirmPassword) {
      setMatchPasswordError(true);
      return false;
    } else {
      setMatchPasswordError(false);
      return true;
    }
  };

  const onSubmit = async (userInfo) => {
    if (!validatePassword(userInfo)) {
      return;
    }
    try {
      const response = await fetchData({
        url: '/users/sign-up',
        method: 'POST',
        data: userInfo
      });

      if (response.data) {
        setUser(response.data)
        navigate("/")
      }
      
    } catch (error) {
      console.log('Signup error: ', error)
    }  
  };
   
  return (
    <div>
      <FormInput
        template={template}
        onSubmit={onSubmit}
        toggleVisibility={toggleVisibility}
        Icon={Icon}
        error={matchPasswordError ? "Password do not match" : error}
        loading={loading}
      />
      {loading && <p>Load...</p>}
    </div>
  );
};

export default Signup;
