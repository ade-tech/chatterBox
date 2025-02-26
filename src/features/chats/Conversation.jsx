import ChatHeader from "./ChatHeader";
import ChatInputForm from "./ChatInputForm";
import ConversationContent from "./ConversationContent";
import { GetRecepientProfile } from "../profile/useProfile";
import { useLastChat } from "../../hooks/useLastChat";
import { useChatCheck, useGetMessages } from "./useChat";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import supabase from "../../services/supabase";

/**
 * Conversation component for displaying the chat conversation.
 * @returns {JSX.Element} The Conversation component.
 */
function Conversation() {
  const { lastChat } = useLastChat();
  const { user_id, isGettingUser } = UseCurrentUserData();
  const { data, isLoading } = GetRecepientProfile(lastChat);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  const { data: chat, isLoading: isCheckingChat } = useChatCheck(
    user_id,
    data?.user_id
  );
  useEffect(() => {
    setLastSeen(data?.last_seen);
  }, [data]);
  const { data: initalMessages, isLoading: isGettingMessages } = useGetMessages(
    chat?.data?.at(0)?.id
  );
  const [messages, setMessages] = useState(initalMessages || []);

  useEffect(() => {
    setMessages(initalMessages);
  }, [initalMessages]);

  useEffect(() => {
    if (!chat?.data?.at(0)?.id) return;
    const messages = supabase
      .channel(`chat-${chat?.data?.at(0)?.id}`)
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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `user_id=eq.${data?.user_id}`,
        },
        (payload) => {
          setLastSeen(payload.new.last_seen);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(messages);
    };
  }, [messages, chat, data]);

  console.log(lastSeen, data);

  return (
    <div className="flex flex-col h-screen ">
      <ChatHeader
        lastSeen={lastSeen}
        recepient={data}
        isLoading={isCheckingChat || isLoading || isGettingUser}
      />
      <ConversationContent
        isLoading={
          isGettingMessages || isCheckingChat || isLoading || isGettingUser
        }
        typingState={isTyping}
        messages={messages}
        key={chat?.data?.at(0)?.id}
      />
      {data?.user_id && (
        <ChatInputForm
          chatID={chat?.data?.at(0)?.id}
          currentID={user_id}
          otherUserID={data.user_id}
          typingState={setIsTyping}
        />
      )}
    </div>
  );
}

export default Conversation;
