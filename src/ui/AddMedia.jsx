import { HiPlus } from "react-icons/hi";

function AddMedia({ onOpen, isOpen }) {
  return (
    <div
      className={` ${
        isOpen ? "rotate-45" : "rotate-0"
      } bg-gray-200 transition-transform duration-100 py-3 px-3 rounded-full dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light cursor-pointer`}
      onClick={onOpen}
    >
      <HiPlus size={20} className="fill-gray-500 dark:fill-accent-light" />
    </div>
  );
}

export default AddMedia;
