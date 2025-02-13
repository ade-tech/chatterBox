import Conversation from "../features/chats/Conversation";

/**
 * ChatsModal component for displaying the chat modal.
 * @returns {JSX.Element} The ChatsModal component.
 */
function ChatsModal() {
  return (
    <div className="fixed md:hidden w-full h-full z-[1000] bg-white px-4 dark:bg-dark">
      <Conversation />
    </div>
  );
}

export default ChatsModal;
