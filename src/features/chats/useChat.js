import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkChat,
  createChat as createChatApi,
  getAllChats,
  getMessages,
} from "../../services/ChatApi";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import { useUser } from "../../hooks/useUser";

/**
 * Custom hook to get all chats for the current user.
 * @returns {Object} The chat data, loading state, and error state.
 */
export function useAllChats() {
  const { userData } = useUser();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllChats(userData?.id),
    queryKey: ["AllChats"],
    enabled: !!userData,
  });

  return { data, isLoading, error };
}

/**
 * Custom hook to check if a chat exists between two users.
 * @param {string} current - The current user ID.
 * @param {string} id - The other user ID.
 * @returns {Object} The chat data, loading state, and error state.
 */
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

/**
 * Custom hook to create a new chat between two users.
 * @returns {Object} The createChat function, loading state, and error state.
 */
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

/**
 * Custom hook to get messages for a given chat ID.
 * @param {string} id - The chat ID.
 * @returns {Object} The messages data, loading state, and error state.
 */
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
