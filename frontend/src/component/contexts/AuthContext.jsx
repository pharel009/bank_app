import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/Axios/useAxios"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const { fetchData } = useAxios();

  //retrieve user token from cookie
    const checkUser = async() => {
      setLoadingUser(true);
      try {
        const { data } = await fetchData({
          url: '/users/check',
          method: 'GET',
          withCredentials: true
        })

        if (data?.data) {
          setUser(data.data)
        }      
      } catch (error) {
        console.log('User not authenticated', error)
        setUser(null);
      } finally {
        setLoadingUser(false)
      }
    };
   
  console.log("AuthContext user: ", user)

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  )
};
