import Message from "./Message";
import { useRef, useEffect } from "react";
import { MessagePreLoader } from "../../ui/ChatPreloader";
import Typing from "../../ui/Typing";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { markAsRead } from "../../services/ChatApi";

function ConversationContent({
  messages,
  chat,
  isLoading,
  typingState,
  otherUser,
  user_id,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
    markAsRead(chat, user_id);
  }, [messages, chat, user_id, typingState]);
  if (isLoading)
    return (
      <div className="pt-3 h-[80vh] px-4 overflow-auto scroll-snap-y-container scrollbar-custom">
        {Array.from({ length: 3 }).map((_, i) => (
          <MessagePreLoader key={i} />
        ))}
      </div>
    );

  return (
    <div className="pt-3 h-[100vh] px-4 overflow-auto scroll-snap-y-container scrollbar-custom">
      {messages?.map((curMessage, i) => {
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
              <div className="w-full flex items-center">
                <span className="inline-block text-xs mx-auto py-2 px-3 rounded-md bg-gray-50 dark:bg-surface-dark dark:text-white">
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
