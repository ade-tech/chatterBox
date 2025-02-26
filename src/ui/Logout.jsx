import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../features/Authentication/useLogout";

function Logout({ type }) {
  const { logoutUser, isLoggingOut } = useLogout();

  return (
    <button
      onClick={logoutUser}
      disabled={isLoggingOut}
      className={`${
        type === "long" &&
        "flex bg-red-500 gap-1 items-center justify-center px-4 rounded-2xl mt-3 md:mt-16 py-2 cursor-pointer"
      }`}
    >
      <HiOutlineLogout
        size={30}
        className={` ${
          type !== "long"
            ? "mb-4 stroke-current cursor-pointer text-dark dark:text-accent-light"
            : "text-white"
        } stroke-current cursor-pointer`}
      />
      {type === "long" && (
        <span className="text-white font-semibold">Sign Out</span>
      )}
    </button>
  );
}

export default Logout;
