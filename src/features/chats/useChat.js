import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../services/ChatApi";
import { useUser } from "../../hooks/useUser";

export function useAllChats() {
  const { userData } = useUser();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllChats(userData?.id),
    queryKey: ["AllChats"],
    enabled: !!userData?.id,
  });

  return { data, isLoading, error };
}
