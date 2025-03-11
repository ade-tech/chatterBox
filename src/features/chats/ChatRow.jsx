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
  console.log(chatDetails);
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
          ? "dark:bg-bg-dark mb-2 flex w-full cursor-pointer items-center justify-start gap-4 rounded-lg bg-gray-50 py-2 pl-4"
          : "mb-2 flex w-full cursor-pointer items-center justify-start gap-4 py-2 pl-4"
      }
    >
      <ProfileImage image={chatDetails.profile.avatar_url} />
      <div className="flex-1">
        <h2 className="text-xl font-semibold dark:text-white">
          {chatDetails.profile.fullName}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {chatDetails.lastChat.content.startsWith("https")
            ? "Image"
            : chatDetails.lastChat.content}
        </p>
      </div>
      <div className="mr-5">
        <span className="dark:text-accent-light text-sm font-light">
          {time}
        </span>
      </div>
    </div>
  );
}

export default ChatRow;
