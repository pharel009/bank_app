import { usePasswordToggle } from "../hooks/usePasswordToggle"
import { FormInput } from "../formInput/FormInput";
import { useAxios } from "../hooks/Axios/useAxios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [inputType, Icon, toggleVisibility] = usePasswordToggle();
  const { loading, error, fetchData } = useAxios();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  let template = {
    title: "Login",
    fields: [
      {type: "email", name: "email", placeholder: "Email"},     
      {type: inputType, name: "password", placeholder: "password"},
    ]
  };

  const onSubmit = async (userInfo) => {
    try {
      const { data } = await fetchData({
        url: '/users/login',
        method: 'POST',
        data: userInfo,
      });

      if (data.data) {
        setUser(data.data);
        navigate("/");
      }
    } catch (error) {
      console.log("Loggin error: ", error)
    }
  };

  return (
    <div>
      <FormInput
        template={template}
        onSubmit={onSubmit}
        toggleVisibility={toggleVisibility}
        Icon={Icon}
        error={error}
        loading={loading}
        />
        {loading && <p>Loading...</p>}
    </div>
  )
};

export default Login;
