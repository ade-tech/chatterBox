import { HiX } from "react-icons/hi";

function Close({ onClose }) {
  return (
    <button onClick={onClose} className="absolute top-3 right-3 z-50">
      <HiX
        size={30}
        className="dark:text-surface-dark rounded-full bg-gray-200 fill-current p-2 text-gray-500"
      />
    </button>
  );
}

export default Close;
