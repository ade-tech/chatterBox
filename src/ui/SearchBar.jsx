import { HiOutlineSearch } from "react-icons/hi";

function SearchBar({ context }) {
  return (
    <div className="relative">
      <HiOutlineSearch
        size={20}
        className="dark:stroke-accent-light absolute top-3 left-2.5 stroke-gray-500"
      />
      <input
        placeholder={`Search in ${context}`}
        type="search"
        className="text-bg-dark dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light h-11 w-full bg-gray-50 pl-9 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
