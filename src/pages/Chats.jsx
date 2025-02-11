import AddChat from "../features/chats/AddChat";
import ChatsContainer from "../features/chats/ChatsContainer";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import SearchBar from "../ui/SearchBar";
import UserModalDetails from "../ui/UserModalDetails.jsx";

function Chats() {
  return (
    <div className="h-screen w-full flex flex-col pt-6 px-4 gap-3 relative overflow-hidden">
      <Modal>
        <div className="">
          <Heading>Chats</Heading>
          <SearchBar context="chats" />
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
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
