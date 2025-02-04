import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";
import Recepient from "../../ui/Recepient";
import ProfileImage from "../../ui/Profile";

function ChatHeader({ recepient }) {
  const { lastChat } = useLastChat();
  return (
    <Link
      to={`/chats/${lastChat}?profile=${recepient}`}
      className="flex gap-4 w-full flex-wrap  py-4 px-4 border-b-1 border-b-gray-100  dark:border-b-bg-dark"
    >
      <ProfileImage />
      <Recepient name="Adelopo Abdullah" status="Online" />
    </Link>
  );
}

export default ChatHeader;
