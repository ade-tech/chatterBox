import { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";

const userContext = createContext();

export function CurrentUserProvider({ children }) {
  const { userData, isGettingUser } = useUser();

  return (
    <userContext.Provider value={{ user_id: userData?.id, isGettingUser }}>
      {children}
    </userContext.Provider>
  );
}

export function UseCurrentUserData() {
  const context = useContext(userContext);

  if (context === undefined)
    throw new Error("Context is used outside of its provider");

  return context;
}
