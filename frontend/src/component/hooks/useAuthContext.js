import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// custom auth hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw Error("useAuthContext must be used inside AuthContextProvider")
    }
    return context;
  };