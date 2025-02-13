import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";
import Recepient from "../../ui/Recepient";
import ProfileImage from "../../ui/Profile";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

/**
 * ChatHeader component for displaying the chat header.
 * @param {Object} props - The component props.
 * @param {Object} props.recepient - The recipient details.
 * @returns {JSX.Element} The ChatHeader component.
 */
function ChatHeader({ recepient }) {
  const { lastChat } = useLastChat();
  const navigate = useNavigate();

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
        <Recepient name={recepient?.fullName} status="Online" />
      </Link>
    </div>
  );
}

export default ChatHeader;
