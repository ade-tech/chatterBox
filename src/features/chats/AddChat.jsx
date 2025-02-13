/**
 * AddChat component for adding a new chat.
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click handler function.
 * @returns {JSX.Element} The AddChat component.
 */
function AddChat({ onClick }) {
  return (
    <button
      className="absolute bottom-26 md:bottom-4 right-6 text-4xl font-medium bg-primary-light cursor-pointer px-3 text-white py-1 rounded-full drop-shadow-3xl"
      onClick={onClick}
    >
      +
    </button>
  );
}

export default AddChat;
