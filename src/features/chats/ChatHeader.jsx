import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";
import Recepient from "../../ui/Recepient";
import ProfileImage from "../../ui/Profile";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ChatHeaderpreloader } from "../../ui/ChatPreloader";
import { UseOnlineUsers } from "../../contexts/OnlineContext";
import { getTime } from "../../utils/gettime";

/**
 * ChatHeader component for displaying the chat header.
 * @param {Object} props - The component props.
 * @param {Object} props.recepient - The recipient details.
 * @returns {JSX.Element} The ChatHeader component.
 */
function ChatHeader({ recepient, isLoading, lastSeen }) {
  const { lastChat } = useLastChat();
  const navigate = useNavigate();
  const { onlineUsers, isGettingUser } = UseOnlineUsers() || {};

  if (isLoading || isGettingUser)
    return (
      <div className="dark:border-b-bg-dark flex w-full flex-wrap items-center gap-4 border-b-1 border-b-gray-100 px-4 py-4">
        <ChatHeaderpreloader />
      </div>
    );

  return (
    <div className="dark:border-b-bg-dark flex w-full flex-wrap items-center gap-4 border-b-1 border-b-gray-100 px-4 py-4">
      <button
        className="dark:bg-surface-dark -translate-x-5 rounded-full bg-gray-200 px-2 py-2 md:hidden"
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
              : `${
                  getTime(lastSeen) === undefined
                    ? "Offline"
                    : `Last seen ${getTime(lastSeen)}`
                }`
          }
        />
      </Link>
    </div>
  );
}

export default ChatHeader;
