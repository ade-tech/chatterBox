import Message from "./Message";
import { useRef, useEffect, useState } from "react";
import { MessagePreLoader } from "../../ui/ChatPreloader";
import Typing from "../../ui/Typing";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { markAsRead } from "../../services/ChatApi";
import supabase from "../../services/supabase";

function ConversationContent({
  messages,
  chat,
  isLoading,
  typingState,
  otherUser,
  user_id,
}) {
  const ref = useRef(null);
  const [realMessages, setRealMessages] = useState();

  useEffect(() => {
    if (!messages) return;
    setRealMessages(messages);
  }, [messages]);

  useEffect(() => {
    const eachMessageChannel = supabase.channel(
      `${user_id}--${otherUser}message`,
      {
        config: {
          presence: {
            key: user_id,
          },
        },
      },
    );

    eachMessageChannel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setRealMessages((curMessage) =>
            curMessage.map((message) =>
              message.content === payload.new.content ? payload.new : message,
            ),
          );
        },
      )
      .subscribe();

    return () => supabase.removeChannel(eachMessageChannel);
  }, [user_id, otherUser]);

  useEffect(() => {
    if (!ref.current) return;
    setTimeout(() => {
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    markAsRead(chat, user_id);
  }, [messages, chat, user_id, typingState]);
  if (isLoading)
    return (
      <div className="scroll-snap-y-container scrollbar-custom h-[80dvh] overflow-auto px-4 pt-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <MessagePreLoader key={i} />
        ))}
      </div>
    );

  if (messages?.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="bg-bg-dark h-fit basis-2/6 rounded-3xl p-4 text-center">
          <p className="mt-2 dark:text-white">
            No messages here yet! <br /> Send a messages to get started
          </p>
          <img src="/empty.webp" alt="No chats" className="mt-2 pr-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-snap-y-container scrollbar-custom h-[100vh] overflow-auto px-4 pt-3">
      {realMessages?.map((curMessage, i) => {
        const curmessageTIme = new Date(curMessage?.created_at);
        const prevmessageTIme = new Date(messages[i - 1]?.created_at);

        let formatTime;

        if (
          !isSameDay(curmessageTIme, prevmessageTIme) &&
          isToday(curmessageTIme)
        ) {
          formatTime = "Today";
        } else if (
          !isSameDay(curmessageTIme, prevmessageTIme) &&
          isYesterday(curmessageTIme)
        ) {
          formatTime = "Yesterday";
        } else if (!isSameDay(curmessageTIme, prevmessageTIme)) {
          formatTime = format(curmessageTIme, "PP");
        }

        const showHeader = formatTime || null;

        return (
          <div key={curMessage.id}>
            {showHeader && (
              <div className="flex w-full items-center">
                <span className="dark:bg-surface-dark mx-auto inline-block rounded-md bg-gray-50 px-3 py-2 text-xs dark:text-white">
                  {formatTime}
                </span>
              </div>
            )}
            <Message message={curMessage} otherUser={otherUser} />
          </div>
        );
      })}
      {typingState && <Typing />}
      <div ref={ref}></div>
    </div>
  );
}

export default ConversationContent;
