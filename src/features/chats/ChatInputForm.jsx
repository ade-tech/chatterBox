import { HiPlus } from "react-icons/hi";
import { IoSend } from "react-icons/io5";

function ChatInputForm() {
  return (
    <form className="w-full h-20 flex gap-2 items-center cursor-pointer ">
      <div className="bg-gray-200 py-3 px-3 rounded-full dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light">
        <HiPlus size={20} className="fill-gray-500 dark:fill-accent-light" />
      </div>
      <input
        placeholder="Enter a Message"
        type="text"
        className="basis-7/8 bg-gray-200  h-11 pl-6 focus:outline-none text-bg-dark dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light rounded-full"
      />
      <div className="bg-primary-light py-3 px-3 rounded-full">
        <IoSend size={20} className="fill-white" />
      </div>
    </form>
  );
}

export default ChatInputForm;
