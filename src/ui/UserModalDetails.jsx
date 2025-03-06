import { HiXMark } from "react-icons/hi2";
import UserList from "../features/chats/UserList";
import { useClickOutside } from "../hooks/useClickOutside";
import { useState } from "react";

/**
 * UserModalDetails component for displaying a modal with user details.
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @returns {JSX.Element} The rendered UserModalDetails component.
 */
function UserModalDetails({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  /**
   * Handles the close animation and calls the onClose function after the animation.
   */
  function handleCloseAnimation() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  const { ref } = useClickOutside({ onClose });

  return (
    <div
      ref={ref}
      className={`${
        isClosing ? "animate-fadeOutDownAnimation" : "animate-fadeInUpAnimation"
      } dark:bg-dark rounded-x-2xl fixed bottom-0 z-[250] mx-auto flex h-3/4 w-full flex-col rounded-t-3xl bg-white px-5 py-5 duration-1000`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="dark:text-accent-dark ml-4 inline-block text-xl font-bold">
          New Chat
        </h1>
        <button
          onClick={handleCloseAnimation}
          className="dark:bg-surface-dark hover:bg-accent-light rounded-full bg-gray-100 p-1 transition-all duration-300 hover:text-white dark:text-white"
        >
          <HiXMark size={20} />
        </button>
      </div>
      <UserList />
    </div>
  );
}

export default UserModalDetails;
