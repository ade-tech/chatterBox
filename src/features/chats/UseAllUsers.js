import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../services/UsersApi";
import { useUser } from "../../hooks/useUser";

export const useAllUsers = () => {
  const { userData } = useUser();
  const id = userData?.id;

  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllUser(id),
    queryKey: ["AllsSers", id],
  });

  return { data, isLoading, error };
};
