import ChatsContainer from "../features/chats/ChatsContainer";
import Heading from "../ui/Heading";
import SearchBar from "../ui/SearchBar";

function Chats() {
  return (
    <div className="h-full w-full rounded-2xl flex flex-col pt-6 px-4 gap-3">
      <Heading>Chats</Heading>
      <SearchBar context="chats" />
      <ChatsContainer />
    </div>
  );
}

export default Chats;
