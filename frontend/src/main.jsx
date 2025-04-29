import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./component/contexts/AuthContext.jsx";
import { AccounContextProvider } from "./component/contexts/AccountContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AccounContextProvider>
          <App />
        </AccounContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
