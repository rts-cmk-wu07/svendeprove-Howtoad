import { createContext, useState, useEffect } from "react";
import useCookie from "react-use-cookie";

export const TokenContext = createContext(null);

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [tokenCookie, setTokenCookie] = useCookie("login-cookie", "");

  useEffect(() => {
    if (tokenCookie) {
      try {
        const parsedToken = JSON.parse(tokenCookie);
        setToken(parsedToken);
      } catch (error) {
        console.error("Failed to parse token from cookie", error);
      }
    }
  }, [tokenCookie]);

  return (
    <TokenContext.Provider value={{ token, setToken, setTokenCookie }}>
      {children}
    </TokenContext.Provider>
  );
}
