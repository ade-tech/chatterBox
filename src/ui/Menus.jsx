import Logo from "./Logo";
import { PiChatTeardropTextFill, PiChatTeardropTextThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { HiBell, HiCog, HiMoon, HiOutlineLogout, HiSun } from "react-icons/hi";
import { useTheme } from "../contexts/ThemeContext";
import { useLogout } from "../features/Authentication/useLogout";
import { GetProfileData } from "../features/profile/useProfile";

/**
 * Menus component for displaying the navigation menu.
 * @param {Object} props - The component props.
 * @param {string} props.styles - Additional styles for the menu.
 * @returns {JSX.Element} The Menus component.
 */
function Menus({ styles }) {
  const { logoutUser, isLoggingOut } = useLogout();
  const { data } = GetProfileData();
  const { mode, setMode } = useTheme();
  const menuStyles = "text-dark dark:text-accent-light";
  return (
    <aside
      className={` ${styles} flex flex-col h-full gap-4 items-center py-3 border-r-1 border-r-gray-100 dark:border-r-bg-dark`}
    >
      <Logo styles="basis-1/6" />
      <ul className="w-full pl-5 flex flex-col gap-4 basis-7/10">
        <NavLink to="chats" className="w-full" role="li">
          {({ isActive }) =>
            isActive ? (
              <PiChatTeardropTextFill
                size={30}
                className={`${menuStyles} fill-current `}
              />
            ) : (
              <PiChatTeardropTextThin
                size={30}
                className={`${menuStyles} stroke-current `}
              />
            )
          }
        </NavLink>
        <NavLink to="notifications" className="w-full" role="li">
          {({ isActive }) =>
            isActive ? (
              <HiBell size={30} className={`${menuStyles} fill-current `} />
            ) : (
              <HiBell
                className={`${menuStyles} fill-transparent stroke-1 stroke-current `}
                size={30}
              />
            )
          }
        </NavLink>
        <NavLink to="settings" className="w-full" role="li">
          {({ isActive }) =>
            isActive ? (
              <HiCog size={30} className={`${menuStyles} fill-current `} />
            ) : (
              <HiCog
                className={`${menuStyles} fill-transparent stroke-1 stroke-current `}
                size={30}
              />
            )
          }
        </NavLink>
      </ul>
      <div className="flex flex-col items-center gap-3">
        <button
          className="cursor-pointer border-b pb-3 border-b-gray-200 dark:border-b-bg-dark"
          onClick={() =>
            setMode((curMode) => (curMode === "dark" ? "light" : "dark"))
          }
        >
          {mode === "dark" ? (
            <HiSun size={30} className={`${menuStyles} fill-current `} />
          ) : (
            <HiMoon size={30} className={`${menuStyles} fill-current `} />
          )}
        </button>
        <button>
          <button onClick={logoutUser} disabled={isLoggingOut}>
            <HiOutlineLogout
              size={30}
              className={`${menuStyles} stroke-current mb-4 cursor-pointer`}
            />
          </button>
        </button>
        <NavLink to="profile">
          <Profile
            width="w-10"
            height="h-10"
            type="image"
            image={data?.avatar_url}
          />
        </NavLink>
      </div>
    </aside>
  );
}

export default Menus;
