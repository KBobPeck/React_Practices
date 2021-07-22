import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        this: "ping",
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
