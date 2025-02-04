import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";

function RecipientProfile({ recepient }) {
  const { lastChat } = useLastChat();
  return (
    <Link
      to={`/chats/${lastChat}?profile=${recepient}`}
      className="w-full h-12 px-5"
    >
      <img src="/default-user.jpg" />
    </Link>
  );
}

export default RecipientProfile;
