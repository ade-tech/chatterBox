import { HiXMark } from "react-icons/hi2";
import AddChat from "../features/chats/AddChat";
import ChatsContainer from "../features/chats/ChatsContainer";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import SearchBar from "../ui/SearchBar";
import UserList from "../features/chats/UserList";
import CloseButton from "../ui/UserModalDetails.jsx";
import UserModalDetails from "../ui/UserModalDetails.jsx";

function Chats() {
  return (
    <Modal>
      <div className="h-full w-full rounded-2xl flex flex-col pt-6 px-4 gap-3 relative overflow-hidden">
        <Heading>Chats</Heading>
        <SearchBar context="chats" />
        <ChatsContainer />
        <Modal.Trigger opens="allChats">
          <AddChat />
        </Modal.Trigger>
        <Modal.Content name="allChats">
          <UserModalDetails />
        </Modal.Content>
      </div>
    </Modal>
  );
}

export default Chats;
