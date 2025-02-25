import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";
import Recepient from "../../ui/Recepient";
import ProfileImage from "../../ui/Profile";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ChatHeaderpreloader } from "../../ui/ChatPreloader";
import { UseOnlineUsers } from "../../contexts/OnlineContext";

/**
 * ChatHeader component for displaying the chat header.
 * @param {Object} props - The component props.
 * @param {Object} props.recepient - The recipient details.
 * @returns {JSX.Element} The ChatHeader component.
 */
function ChatHeader({ recepient, isLoading }) {
  const { lastChat } = useLastChat();
  const navigate = useNavigate();
  const { onlineUsers, isGettingUser } = UseOnlineUsers();

  if (isLoading || isGettingUser)
    return (
      <div className="flex items-center gap-4 w-full flex-wrap  py-4 px-4 border-b-1 border-b-gray-100  dark:border-b-bg-dark">
        <ChatHeaderpreloader />
      </div>
    );

  return (
    <div className="flex items-center gap-4 w-full flex-wrap  py-4 px-4 border-b-1 border-b-gray-100  dark:border-b-bg-dark">
      <button
        className="md:hidden bg-gray-200 dark:bg-surface-dark px-2 py-2 rounded-full"
        onClick={() => navigate(`/chats`)}
      >
        <HiArrowLeft size={15} className="text-white" />
      </button>
      <Link
        className="flex gap-3"
        to={`/chats/${lastChat}?profile=${recepient?.user_id}`}
      >
        <ProfileImage type="image" image={recepient?.avatar_url} />
        <Recepient
          name={recepient?.fullName}
          status={
            onlineUsers?.includes(recepient?.user_id)
              ? "Online"
              : "Last seen recently"
          }
        />
      </Link>
    </div>
  );
}

export default ChatHeader;
