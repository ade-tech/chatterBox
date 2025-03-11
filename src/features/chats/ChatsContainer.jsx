import Empty from "../../ui/Empty";
import ChatRow from "./ChatRow";
import { useAllChats } from "./useChat";
import ChatPreloader from "../../ui/ChatPreloader";
import { useEffect } from "react";
import supabase from "../../services/supabase";
import { useUser } from "../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

/**
 * ChatsContainer component fetches and displays a list of chats.
 * @returns {JSX.Element} The rendered ChatsContainer component.
 */
function ChatsContainer() {
  const { userData } = useUser();
  const queryClient = useQueryClient();
  const { data, isLoading: isFetchingChats, error } = useAllChats();

  let chats = data;
  const hasChatContent = chats?.filter((curChat) => curChat.lastChat !== "");

  useEffect(() => {
    const newMessagesChannel = supabase.channel("chatterBox-newMessages", {
      config: {
        presence: {
          key: userData?.id,
        },
      },
    });
    newMessagesChannel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "last" },
        () => {
          queryClient.invalidateQueries(["AllChats"]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(newMessagesChannel);
  }, [userData, queryClient]);

  if (isFetchingChats)
    return (
      <>
        {Array.from({
          length: 3,
        }).map((_, i) => (
          <ChatPreloader key={i} />
        ))}
      </>
    );

  if (!chats || error || hasChatContent.length === 0)
    return (
      <div className="h-full w-full items-center justify-center">
        <Empty
          icon={
            <svg
              width="150px"
              height="150px"
              viewBox="0 0 129 98"
              fill="none"
              className="stroke-bg-dark dark:stroke-accent-dark mt-3 stroke-1"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M64.68 75.0499V95.0499L2.04004 58.8899V38.8899L19.36 48.8899L47.2 64.9599L54.16 68.9799L64.68 75.0499Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M126.94 39.1099V59.1099L64.6801 95.0499V75.0499L75.0301 69.0799L81.9501 65.0799L109.62 49.1099L126.94 39.1099Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M64.29 2.94995L2.04004 38.9L19.36 48.9L47.2 64.97L54.16 68.99L64.68 75.06L75.03 69.09L81.95 65.0899L109.62 49.1199L126.94 39.1199L64.29 2.94995ZM81.86 49.07L78.43 51.0499L74.87 49L71.43 47.0099L64.51 43.02L64.46 43.0499L57.55 47.0299L54.1 49.02L50.67 51L47.12 48.95L43.71 46.9799L50.54 43.04L57.55 39L50.54 34.95L47.02 32.9199L43.63 30.9599L50.54 26.97L53.94 28.93L64.46 35L74.82 29.0299L78.3 27.02L85.26 31.0299L81.77 33.04L78.3 35.0499L71.43 39.02L78.3 42.99L85.35 47.06L81.86 49.07Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M57.55 38.99V47.02L54.1 49.02L50.67 50.99L47.12 48.95L43.71 46.97L50.54 43.03L57.55 38.99Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M50.54 26.96V34.95L47.02 32.91L43.63 30.96L50.54 26.96Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M64.46 34.99V43.04L57.55 47.02V38.99L50.54 34.95V26.96L53.94 28.92L64.46 34.99Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M85.2601 31.02L81.7701 33.03L78.3 35.04V27.02L85.2601 31.02Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M78.3 27.02V35.04L71.43 39.02V47.01L64.51 43.02L64.46 43.04V34.99L74.82 29.02L78.3 27.02Z"
                stroke="2"
                strokeLinejoin="round"
              />
              <path
                d="M85.3501 47.05L81.86 49.07L78.4301 51.04L74.8701 48.99L71.4301 47.01V39.02L78.3 42.98L85.3501 47.05Z"
                stroke="2"
                strokeLinejoin="round"
              />
            </svg>
          }
          context="Chat"
          info="Your chat inbox is empty try starting a message"
        />
      </div>
    );

  return (
    <div className="scrollbar-custom w-full flex-grow overflow-hidden hover:overflow-y-scroll">
      {chats
        ?.filter((curChat) => curChat.lastChat !== "")
        .map((chat) => {
          return <ChatRow key={chat.profile.user_id} chatDetails={chat} />;
        })}
    </div>
  );
}

export default ChatsContainer;
