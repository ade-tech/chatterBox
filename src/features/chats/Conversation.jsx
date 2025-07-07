import ChatHeader from "./ChatHeader";
import ChatInputForm from "./ChatInputForm";
import { useSearchParams } from "react-router-dom";
import ConversationContent from "./ConversationContent";
import { GetRecepientProfile } from "../profile/useProfile";
import { useLastChat } from "../../hooks/useLastChat";
import { useChatCheck, useGetMessages } from "./useChat";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import ReceipientProfile from "../../ui/ReceipientProfile";

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
  const [searchParams] = useSearchParams();
  const id = searchParams.get("profile");
  const { data: chat, isLoading: isCheckingChat } = useChatCheck(
    user_id,
    data?.user_id,
  );

  console.log(id);

  useEffect(() => {
    setLastSeen(data?.last_seen);
  }, [data]);
  const { data: initalMessages, isLoading: isGettingMessages } = useGetMessages(
    chat?.data?.at(0)?.id,
  );
  const [messages, setMessages] = useState(initalMessages || []);
  const imageMessages = messages?.filter(
    (curMessage) => curMessage.type !== "text",
  );

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
        },
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
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(messages);
    };
  }, [messages, chat, data]);

  return (
    <div className="flex h-[100dvh]">
      <div className="flex h-[100dvh] flex-1 basis-2/3 flex-col">
        <ChatHeader
          lastSeen={lastSeen}
          recepient={data}
          isLoading={isCheckingChat || isLoading || isGettingUser}
        />
        <ConversationContent
          isLoading={
            isGettingMessages || isCheckingChat || isLoading || isGettingUser
          }
          otherUser={data?.user_id}
          typingState={isTyping}
          messages={messages}
          key={chat?.data?.at(0)?.id}
          chat={chat?.data?.at(0)?.id}
          user_id={user_id}
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
      {id && <ReceipientProfile id={id} imageData={imageMessages} />}
    </div>
  );
}

export default Conversation;
