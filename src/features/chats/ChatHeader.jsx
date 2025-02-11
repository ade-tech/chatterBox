import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";
import Recepient from "../../ui/Recepient";
import ProfileImage from "../../ui/Profile";
import { HiArrowLeft } from "react-icons/hi";

function ChatHeader({ recepient }) {
  const { lastChat } = useLastChat();
  return (
    <div className="flex items-center gap-4 w-full flex-wrap  py-4 px-4 border-b-1 border-b-gray-100  dark:border-b-bg-dark">
      <button className="md:hidden bg-gray-200 dark:bg-surface-dark px-2 py-2 rounded-full">
        <HiArrowLeft size={15} className="text-white" />
      </button>
      <Link
        className="flex gap-3"
        to={`/chats/${lastChat}?profile=${recepient}`}
      >
        <ProfileImage type="image" />
        <Recepient name="Adelopo Abdullah" status="Online" />
      </Link>
    </div>
  );
}

export default ChatHeader;
