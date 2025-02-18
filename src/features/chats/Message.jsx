import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import Spinner from "../../ui/Spinner";
import { getTimeSent } from "../../utils/gettime";
import { useEffect } from "react";

/**
 * ReceiverChat component for displaying a chat message.
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message details.
 * @returns {JSX.Element} The ReceiverChat component.
 */
function ReceiverChat({ message }) {
  console.log(message);
  const { user_id: currentUserID, isGettingUser } = UseCurrentUserData();

  const { content, type, sender_id, isReadby, created_at } = message;

  const basicStyles = "max-w-72  md:max-w-96 w-fit py-2 px-5 rounded-3xl";
  if (sender_id === currentUserID)
    return (
      <div className="w-full mb-3">
        <div className={`${basicStyles} ml-auto bg-primary-light`}>
          <p className="text-white text-sm">{content}</p>
          <p className="text-xs text-gray-400 text-left pr-3 w-full">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );

  if (sender_id !== currentUserID)
    return (
      <div className="w-full mb-3">
        <div
          className={`${basicStyles} mr-auto bg-primary-transparent border border-gray-200 dark:bg-bg-dark dark:border-transparent`}
        >
          <p className="text-dark text-sm dark:text-white">{content}</p>
          <p className="text-xs text-gray-500 text-right pr-3 w-full">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
}

export default ReceiverChat;
