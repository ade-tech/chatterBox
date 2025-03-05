import Logo from "./Logo";
import { PiChatTeardropTextFill, PiChatTeardropTextThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { HiBell, HiCog, HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "../contexts/ThemeContext";
import { GetProfileData } from "../features/profile/useProfile";
import Logout from "./Logout";

/**
 * Menus component for displaying the navigation menu.
 * @param {Object} props - The component props.
 * @param {string} props.styles - Additional styles for the menu.
 * @returns {JSX.Element} The Menus component.
 */
function Menus({ styles }) {
  const { data } = GetProfileData();
  const { mode, setMode } = useTheme();

  const menuStyles = "text-dark dark:text-accent-light";
  return (
    <aside
      className={` ${styles} dark:border-r-bg-dark flex h-full flex-col items-center gap-4 border-r-1 border-r-gray-100 py-3`}
    >
      <Logo styles="basis-1/6" />
      <ul className="flex w-full basis-7/10 flex-col items-center gap-4">
        <NavLink to="chats" role="li">
          {({ isActive }) =>
            isActive ? (
              <PiChatTeardropTextFill
                size={30}
                className={`${menuStyles} fill-current`}
              />
            ) : (
              <PiChatTeardropTextThin
                size={30}
                className={`${menuStyles} stroke-current`}
              />
            )
          }
        </NavLink>
        <NavLink to="notifications" role="li">
          {({ isActive }) =>
            isActive ? (
              <HiBell size={30} className={`${menuStyles} fill-current`} />
            ) : (
              <HiBell
                className={`${menuStyles} fill-transparent stroke-current stroke-1`}
                size={30}
              />
            )
          }
        </NavLink>
        <NavLink to="settings" role="li">
          {({ isActive }) =>
            isActive ? (
              <HiCog size={30} className={`${menuStyles} fill-current`} />
            ) : (
              <HiCog
                className={`${menuStyles} fill-transparent stroke-current stroke-1`}
                size={30}
              />
            )
          }
        </NavLink>
      </ul>
      <div className="flex flex-col items-center gap-3">
        <button
          className="dark:border-b-bg-dark cursor-pointer border-b border-b-gray-200 pb-3"
          onClick={() =>
            setMode((curMode) => (curMode === "dark" ? "light" : "dark"))
          }
        >
          {mode === "dark" ? (
            <HiSun size={30} className={`${menuStyles} fill-current`} />
          ) : (
            <HiMoon size={30} className={`${menuStyles} fill-current`} />
          )}
        </button>

        <Logout />
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
