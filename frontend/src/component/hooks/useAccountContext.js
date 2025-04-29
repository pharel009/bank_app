import { useContext } from "react";
import { AccounContext } from "../contexts/AccountContext"

// custom account hook
export const useAccountContext = () => {
    const context = useContext(AccounContext);
  
    if (!context) {
      throw Error("useAccountContext must be used inside AccountContextProvider");
    }
    return context;
  };