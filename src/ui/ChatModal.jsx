import Conversation from "../features/chats/Conversation";

function ChatsModal() {
  return (
    <div className="fixed md:hidden w-full h-full z-[1000] bg-white px-4 dark:bg-dark">
      <Conversation />
    </div>
  );
}

export default ChatsModal;
