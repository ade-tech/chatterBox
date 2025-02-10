import { HiXMark } from "react-icons/hi2";
import UserList from "../features/chats/UserList";
import { useClickOutside } from "../hooks/useClickOutside";

function UserModalDetails({ onClose }) {
  const { ref } = useClickOutside({ onClose });
  return (
    <div
      ref={ref}
      className="w-full h-3/4 bg-white dark:bg-dark rounded-x-2xl mx-auto fixed rounded-t-3xl py-5 px-5 bottom-0 flex flex-col animate-fadeInUpAnimation  duration-1000 "
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl inline-block font-bold ml-4 dark:text-accent-dark">
          New Chat
        </h1>
        <button
          onClick={onClose}
          className="dark:bg-surface-dark dark:text-white hover:bg-accent-light transition-all duration-300 rounded-full p-1 bg-gray-100 hover:text-white"
        >
          <HiXMark size={20} />
        </button>
      </div>
      <UserList />
    </div>
  );
}

export default UserModalDetails;
