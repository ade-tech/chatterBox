import AddChat from "../features/chats/AddChat";
import ChatsContainer from "../features/chats/ChatsContainer";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import SearchBar from "../ui/SearchBar";
import UserModalDetails from "../ui/UserModalDetails.jsx";

function Chats() {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col gap-3 overflow-hidden px-4 pt-6">
      <Modal>
        <div className="">
          <Heading>Chats</Heading>
          <SearchBar context="chats" />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatsContainer />
        </div>
        <Modal.Trigger opens="allChats">
          <AddChat />
        </Modal.Trigger>
        <Modal.Content name="allChats">
          <UserModalDetails />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Chats;
