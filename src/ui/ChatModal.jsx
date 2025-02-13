import ChatHeader from "../features/chats/chatHeader";
import ChatInputForm from "../features/chats/ChatInputForm";
import ConversationContent from "../features/chats/ConversationContent";
import { GetRecepientProfile } from "../features/profile/useProfile";
import Spinner from "../ui/Spinner";
import { useLastChat } from "../hooks/useLastChat";
import { useChatCheck, useGetMessages } from "../features/chats/useChat";
import { UseCurrentUserData } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import supabase from "../services/supabase";

/**
 * ChatsModal component for displaying the chat modal.
 * @returns {JSX.Element} The ChatsModal component.
 */
function ChatModal() {
  const { lastChat } = useLastChat();
  const { user_id, isGettingUser } = UseCurrentUserData();
  const { data, isLoading } = GetRecepientProfile(lastChat);

  const { data: chat, isLoading: isCheckingChat } = useChatCheck(
    user_id,
    data?.user_id
  );

  console.log(chat);
  const { data: initalMessages } = useGetMessages(chat?.data?.at(0)?.id);
  const [messages, setMessages] = useState(initalMessages || []);

  useEffect(() => {
    setMessages(initalMessages);
  }, [initalMessages]);

  useEffect(() => {
    if (!chat?.data?.at(0)?.id) return;
    const messages = supabase
      .channel(`chat-mobile-${chat?.data?.at(0)?.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chat?.data.at(0)?.id}`,
        },
        (payload) => {
          setMessages((curMessages) => [...curMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messages);
    };
  }, [messages, chat]);

  if (isLoading || isGettingUser || isCheckingChat || !chat?.data?.at(0)?.id)
    return <Spinner />;
  return (
    <div className="fixed top-0 w-full  md:hidden z-[100000] flex flex-col h-screen bg-white dark:bg-dark ">
      <ChatHeader recepient={data} />
      <ConversationContent messages={messages} key={chat?.data?.at(0).id} />
      <ChatInputForm chatID={chat?.data?.at(0)?.id} currentID={user_id} />
    </div>
  );
}

export default ChatModal;
