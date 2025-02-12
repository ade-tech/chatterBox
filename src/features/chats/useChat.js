import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkChat,
  createChat as createChatApi,
  getAllChats,
  getMessages,
} from "../../services/ChatApi";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";

export function useAllChats() {
  const { user_id: currentUserID } = UseCurrentUserData();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllChats(currentUserID),
    queryKey: ["AllChats"],
    enabled: !!currentUserID,
  });

  return { data, isLoading, error };
}

export function useChatCheck(current, id) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`chat--${current}--${id}`],
    queryFn: ({ queryKey }) => {
      const [, user_id, other_id] = queryKey.at(0).split("--");

      return checkChat(user_id, other_id);
    },
    enabled: !!current && !!id,
    retry: false,
  });

  return { data, isLoading, error };
}

export function useCreateChat() {
  const { user_id: currentUserID } = UseCurrentUserData();

  const {
    mutate: createChat,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (id) => createChatApi(currentUserID, id),
  });

  return { createChat, isLoading, error };
}

export function useGetMessages(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`messages--${id}`],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey.at(0).split("--");
      return getMessages(id);
    },
    enabled: !!id,
    retry: false,
  });
  return { isLoading, data, error };
}
