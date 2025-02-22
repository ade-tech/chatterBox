import { useNavigate } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat.jsx";
import ProfileImage from "../../ui/Profile.jsx";
import { getTime } from "../../utils/gettime.js";

/**
 * ChatRow component represents a single row in a chat list.
 * @param {Object} props - The component props.
 * @param {Object} props.chatDetails - The details of the chat.
 * @param {Object} props.chatDetails.profile - The profile details of the chat participant.
 * @param {string} props.chatDetails.profile.user_id - The user ID of the chat participant.
 * @param {string} props.chatDetails.profile.avatar_url - The avatar URL of the chat participant.
 * @param {string} props.chatDetails.profile.fullName - The full name of the chat participant.
 * @param {Object} props.chatDetails.lastChat - The last chat details.
 * @param {string} props.chatDetails.lastChat.content - The content of the last chat message.
 * @param {string} props.chatDetails.lastChat.created_at - The timestamp of the last chat message.
 * @returns {JSX.Element} The rendered ChatRow component.
 */
function ChatRow({ chatDetails }) {
  const navigate = useNavigate();
  const { lastChat } = useLastChat();

  const time = getTime(chatDetails.lastChat.created_at);
  const chatInfo = {
    id: chatDetails.profile.user_id,
  };

  return (
    <div
      onClick={() => navigate(`/chats/${chatDetails.profile.user_id}`)}
      className={
        chatInfo.id === lastChat
          ? "w-full gap-4 flex justify-start pl-4 py-2 mb-2 items-center bg-gray-50 dark:bg-bg-dark rounded-lg cursor-pointer"
          : "w-full gap-4 mb-2 flex justify-start pl-4 py-2 items-center cursor-pointer"
      }
    >
      <ProfileImage image={chatDetails.profile.avatar_url} />
      <div className="flex-1">
        <h2 className="text-xl dark:text-white font-semibold">
          {chatDetails.profile.fullName}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {chatDetails.lastChat.content}
        </p>
      </div>
      <div className="mr-5">
        <span className="text-sm dark:text-accent-light font-light">
          {time}
        </span>
      </div>
    </div>
  );
}

export default ChatRow;
