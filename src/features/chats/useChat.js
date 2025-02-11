import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkChat,
  createChat as createChatApi,
  getAllChats,
} from "../../services/ChatApi";
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

export function useChatCheck(id) {
  const { userData } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: [`chat--${userData?.id}--${id}`],
    queryFn: ({ queryKey }) => {
      const [, user_id, other_id] = queryKey.at(0).split("--");

      return checkChat(user_id, other_id);
    },
    enabled: !!userData?.id && !!id,
    retry: false,
  });

  return { data, isLoading, error };
}

export function useCreateChat() {
  const { userData } = useUser();

  const {
    mutate: createChat,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (id) => createChatApi(userData?.id, id),
  });

  return { createChat, isLoading, error };
}

export function useGetMessages(id) {
  const { userData } = useUser();
  const { data, isLoading, error } = useQuery({
    queryKey: [`messages--${userData?.id}--${id}`],
    queryFn: ({ queryKey }) => {
      const [, user_id, other_id] = queryKey.at(0).split("--");

      return checkChat(user_id, other_id);
    },
    enabled: !!userData?.id && !!id,
    retry: false,
  });
  console.log(data);
  return { isLoading, data, error };
}
