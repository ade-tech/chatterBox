import { Link } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat";

/**
 * RecipientProfile component for displaying the recipient's profile.
 * @param {Object} props - The component props.
 * @param {Object} props.recepient - The recipient details.
 * @returns {JSX.Element} The RecipientProfile component.
 */
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
