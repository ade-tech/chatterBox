import ChatHeader from "./ChatHeader";
import ChatInputForm from "./ChatInputForm";
import ConversationContent from "./ConversationContent";

function Conversation() {
  return (
    <div className="flex flex-col h-screen ">
      <ChatHeader />
      <ConversationContent />
      <ChatInputForm />
    </div>
  );
}

export default Conversation;
