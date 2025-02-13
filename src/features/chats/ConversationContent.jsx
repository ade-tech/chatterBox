import Message from "./Message";
import { useRef, useEffect } from "react";

/**
 * ConversationContent component for displaying the chat messages.
 * @param {Object} props - The component props.
 * @param {Array} props.messages - The list of messages.
 * @returns {JSX.Element} The ConversationContent component.
 */
function ConversationContent({ messages }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="pt-3 h-[80vh] px-4 overflow-auto scroll-snap-y-container scrollbar-custom">
      {messages?.map((curMessage) => (
        <Message message={curMessage} key={curMessage.id} />
      ))}
      <div ref={ref}> </div>
    </div>
  );
}

export default ConversationContent;
