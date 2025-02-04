import { useNavigate } from "react-router-dom";
import { useLastChat } from "../../hooks/useLastChat.jsx";
import ProfileImage from "../../ui/Profile.jsx";

function ChatRow() {
  const navigate = useNavigate();
  const { lastChat } = useLastChat();

  const chatInfo = {
    id: 1,
  };
  return (
    <div
      onClick={() => navigate(`/chats/${1}`)}
      className={
        chatInfo.id === Number(lastChat)
          ? "w-full  gap-4 flex-grow overflow-y-auto flex justify-start pl-4 py-2 items-center bg-gray-50 dark:bg-bg-dark rounded-lg cursor-pointer"
          : "w-full  gap-4 flex-grow overflow-y-auto flex justify-start pl-4 py-2 items-center cursor-pointer"
      }
    >
      <ProfileImage />
      <div>
        <h2 className="text-xl dark:text-white font-semibold">
          Adelopo Abdullah
        </h2>
        <p className="text-xs text-gray-500  dark:text-gray-400">
          I just sent you 5k for your school fees
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default ChatRow;
