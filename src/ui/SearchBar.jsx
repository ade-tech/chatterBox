import { HiOutlineSearch } from "react-icons/hi";

function SearchBar({ context }) {
  return (
    <div className="relative">
      <HiOutlineSearch
        size={20}
        className="absolute left-2.5 top-3 stroke-gray-500 dark:stroke-accent-light"
      />
      <input
        placeholder={`Search in ${context}`}
        type="search"
        className="w-full  bg-gray-50  h-11 pl-9 focus:outline-none text-bg-dark dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light"
      />
    </div>
  );
}

export default SearchBar;
