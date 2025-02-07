import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../services/LoginApi";

export function useUser() {
  const { data: userData, isLoading: isGettingUser } = useQuery({
    queryFn: getLoggedInUser,
    queryKey: ["ActiveUser"],
  });

  return { userData, isGettingUser };
}
