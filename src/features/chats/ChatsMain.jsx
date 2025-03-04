import Empty from "../../ui/Empty";
import { useLastChat } from "../../hooks/useLastChat.jsx";
import Conversation from "./Conversation.jsx";
import { useParams } from "react-router-dom";

function ChatsMain({ isMobile }) {
  const { lastChat } = useLastChat();
  const { id } = useParams() || null;
  const activeChat = isMobile ? id : lastChat;

  console.log(isMobile);
  if (!activeChat)
    return (
      <div className="hidden h-[100dvh] md:h-screen w-full md:flex items-center justify-center">
        <Empty
          context="Conversation"
          info="There is no active conversation Selected"
          icon={
            <svg
              width="150"
              height="150"
              viewBox="0 0 122 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeWidth="2"
              strokeLinejoin="round"
              className="stroke-1 stroke-bg-dark dark:stroke-accent-dark"
            >
              <path
                d="M59.3197 70.7797V90.7797L2.38965 57.9097V37.9097L7.38965 40.7897L30.4197 54.0897L39.0997 59.1097L53.0997 67.1897L59.3197 70.7797Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M120.01 35.7397V55.7397L59.3196 90.7797V70.7797L65.2796 67.3397L79.3996 59.1897L87.8196 54.3197L102.69 45.7397L120.01 35.7397Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M63.0797 2.86963L11.1396 7.92963L2.38965 37.9096L7.38965 40.7896L30.4197 54.0896L39.0997 59.1096L53.0997 67.1896L59.3197 70.7796L65.2797 67.3396L79.3997 59.1896L87.8197 54.3196L102.69 45.7396L120.01 35.7396L63.0797 2.86963ZM65.2397 39.1596H65.2297L65.2797 47.5896L65.3097 52.1296V52.2096L53.1297 52.1896L53.0597 39.1296H52.9497L30.4497 39.0896L30.4097 32.0596L53.0197 32.0996L52.9797 23.8496L52.9497 19.0496L65.1297 19.0696L65.1597 24.0696L65.1997 32.1296L79.1597 32.1496L87.8097 32.1696L87.8397 37.1596V39.1996L65.2397 39.1596Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M53.0197 32.0996L52.9497 39.0496V39.1296L30.4497 39.0896L30.4097 32.0596L53.0197 32.0996Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M65.3097 52.1296V52.2096L53.1297 52.1896L53.0597 39.1296H52.9497V39.0496L65.1297 39.0696L65.1997 52.1296H65.3097Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M87.8497 39.1996L65.2397 39.1596L65.1997 32.1296L79.1597 32.1496L87.8097 32.1696L87.8397 37.1596L87.8497 39.1996Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M65.3097 52.1296H65.1997L65.1297 39.0696L52.9497 39.0496L53.0197 32.0996L52.9797 23.8496L52.9497 19.0496L65.1297 19.0696L65.1597 24.0696L65.1997 32.1296L65.2397 39.1596H65.2297L65.2797 47.5896L65.3097 52.1296Z"
                stroke="2"
                strokeLinejoin="round"
              />
            </svg>
          }
        />{" "}
      </div>
    );
  return (
    <div
      className={`${
        isMobile ? "absolute z-[1000] top-0 bg-white dark:bg-dark" : "relative"
      } flex flex-col h-[100dvh] w-full px-4`}
    >
      <Conversation />
    </div>
  );
}

export default ChatsMain;
