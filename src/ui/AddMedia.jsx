import { HiPlus } from "react-icons/hi";

function AddMedia({ onOpen, isOpen }) {
  return (
    <div
      className={` ${
        isOpen ? "rotate-45" : "rotate-0"
      } dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light cursor-pointer rounded-full bg-gray-200 px-3 py-3 transition-transform duration-100`}
      onClick={onOpen}
    >
      <HiPlus size={20} className="dark:fill-accent-light fill-gray-500" />
    </div>
  );
}

export default AddMedia;
