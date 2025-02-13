import Message from "./Message";

/**
 * ConversationContent component for displaying the chat messages.
 * @param {Object} props - The component props.
 * @param {Array} props.messages - The list of messages.
 * @returns {JSX.Element} The ConversationContent component.
 */
function ConversationContent({ messages }) {
  return (
    <div className="pt-3 flex-grow px-4 overflow-hidden overflow-y-scroll  scrollbar-custom">
      {messages?.map((curMessage) => (
        <Message message={curMessage} key={curMessage.id} />
      ))}
    </div>
  );
}

export default ConversationContent;
