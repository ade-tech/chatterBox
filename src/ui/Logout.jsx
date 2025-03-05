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
        "mt-3 flex cursor-pointer items-center justify-center gap-1 rounded-2xl bg-red-500 px-4 py-2 md:mt-10"
      }`}
    >
      <HiOutlineLogout
        size={30}
        className={` ${
          type !== "long"
            ? "text-dark dark:text-accent-light mb-4 cursor-pointer stroke-current"
            : "text-white"
        } cursor-pointer stroke-current`}
      />
      {type === "long" && (
        <span className="font-semibold text-white">Sign Out</span>
      )}
    </button>
  );
}

export default Logout;
