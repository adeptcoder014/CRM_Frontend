import React, { createContext, useMemo, useContext } from "react";
//===============================================
export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Token");
    const value = useMemo(
      () => ({
        token,
      }),   
      [token]
    );

    return (
      <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    );
  }
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used inside TokenProvider");
  return context;
};

export default TokenProvider;
