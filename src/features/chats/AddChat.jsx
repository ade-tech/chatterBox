/**
 * AddChat component for adding a new chat.
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click handler function.
 * @returns {JSX.Element} The AddChat component.
 */
function AddChat({ onClick }) {
  return (
    <button
      className="bg-primary-light drop-shadow-3xl absolute right-6 bottom-26 cursor-pointer rounded-full px-3 py-1 text-4xl font-medium text-white md:bottom-4"
      onClick={onClick}
    >
      +
    </button>
  );
}

export default AddChat;
