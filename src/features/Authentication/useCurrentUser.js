import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/LoginApi";

export function useCurrentUser() {
  const { data, isLoading } = useQuery({
    queryFn: getLoggedInUser,
    queryKey: ["user"],
  });

  return { data, isLoading };
}
