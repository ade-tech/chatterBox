import { HiX } from "react-icons/hi";

function Close({ onClose }) {
  return (
    <button onClick={onClose} className="absolute top-3 right-3 z-50">
      <HiX
        size={30}
        className="fill-current text-gray-500 dark:text-surface-dark rounded-full p-2 bg-gray-200"
      />
    </button>
  );
}

export default Close;
