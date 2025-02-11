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
