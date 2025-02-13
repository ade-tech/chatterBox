import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/LoginApi";

/**
 * Custom hook to get the current logged-in user.
 * @returns {Object} The user data, loading state, and error state.
 */
export function useCurrentUser() {
  const { data, isLoading, error } = useQuery({
    queryFn: getLoggedInUser,
    queryKey: ["user"],
  });

  return { data, isLoading, error };
}
