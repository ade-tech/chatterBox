import { createContext, useContext } from "react";
import { useUser } from "../hooks/useUser";

const userContext = createContext();

/**
 * Provides the current user context to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The CurrentUserProvider component.
 */
export function CurrentUserProvider({ children }) {
  const { userData, isGettingUser } = useUser();

  return (
    <userContext.Provider
      value={{
        user_id: userData?.id,
        user_email: userData?.email,
        isGettingUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

/**
 * Custom hook to access the current user data.
 * @returns {Object} The current user data and loading state.
 * @throws {Error} If the context is used outside of its provider.
 */
export function UseCurrentUserData() {
  const context = useContext(userContext);

  if (context === undefined)
    throw new Error("Context is used outside of its provider");

  return context;
}
