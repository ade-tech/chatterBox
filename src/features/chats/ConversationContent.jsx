import Message from "./Message";
import { useRef, useEffect } from "react";
import { MessagePreLoader } from "../../ui/ChatPreloader";
import Typing from "../../ui/Typing";

/**
 * ConversationContent component for displaying the chat messages.
 * @param {Object} props - The component props.
 * @param {Array} props.messages - The list of messages.
 * @returns {JSX.Element} The ConversationContent component.
 */
function ConversationContent({ messages, isLoading, typingState }) {
  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  if (isLoading)
    return (
      <div className="pt-3 h-[80vh] px-4 overflow-auto scroll-snap-y-container scrollbar-custom">
        {Array.from({ length: 2 }).map((_, i) => (
          <MessagePreLoader key={i} />
        ))}
      </div>
    );

  return (
    <div className="pt-3 h-[80vh] px-4 overflow-auto scroll-snap-y-container scrollbar-custom">
      {messages?.map((curMessage) => (
        <Message message={curMessage} key={curMessage.id} />
      ))}
      {typingState && <Typing />}
      <div ref={ref}> </div>
    </div>
  );
}

export default ConversationContent;
