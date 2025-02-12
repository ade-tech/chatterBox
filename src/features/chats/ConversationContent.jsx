import Message from "./Message";
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
