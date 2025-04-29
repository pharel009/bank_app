import { createContext, useContext, useEffect, useState } from "react";


export const AccounContext = createContext();

export const AccounContextProvider = ({ children }) => {
  const [acct, setAcct] = useState(null);

  console.log("Account context: ", acct);

  return (
    <AccounContext.Provider value={{ acct, setAcct }}>
      {children}
    </AccounContext.Provider>
  );
};

