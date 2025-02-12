import ChatHeader from "./ChatHeader";
import ChatInputForm from "./ChatInputForm";
import ConversationContent from "./ConversationContent";
import { GetRecepientProfile } from "../profile/useProfile";
import Spinner from "../../ui/Spinner";
import { useLastChat } from "../../hooks/useLastChat";
import { useChatCheck, useGetMessages } from "./useChat";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";

function Conversation() {
  const { lastChat } = useLastChat();
  const { user_id, isGettingUser } = UseCurrentUserData();
  const { data, isLoading } = GetRecepientProfile(lastChat);

  const { data: chat, isLoading: isCheckingChat } = useChatCheck(
    user_id,
    data?.user_id
  );
  const { data: messages } = useGetMessages(chat?.data?.at(0)?.id);

  if (isLoading || isGettingUser || isCheckingChat) return <Spinner />;
  return (
    <div className="flex flex-col h-screen ">
      <ChatHeader recepient={data} />
      <ConversationContent messages={messages} />
      <ChatInputForm />
    </div>
  );
}

export default Conversation;
