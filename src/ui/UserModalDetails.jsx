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
      } w-full h-3/4 bg-white dark:bg-dark rounded-x-2xl mx-auto fixed rounded-t-3xl py-5 px-5 bottom-0 flex flex-col  duration-1000`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl inline-block font-bold ml-4 dark:text-accent-dark">
          New Chat
        </h1>
        <button
          onClick={handleCloseAnimation}
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
