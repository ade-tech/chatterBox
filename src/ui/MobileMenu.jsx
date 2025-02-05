import { HiBell, HiCog } from "react-icons/hi";
import { PiChatTeardropTextFill, PiChatTeardropTextThin } from "react-icons/pi";
import ProfileImage from "./Profile";
import MobileNav from "./MobileNav";

function MobileMenu() {
  const menuStyles = "text-dark dark:text-accent-light ";
  return (
    <ul className="w-full fixed md:hidden z-[100] bottom-0 h-fit bg-light flex items-center justify-around transiton-all duration-700 pt-6 pb-4 border-t border-t-gray-200 dark:bg-dark border-surface-dark">
      <div className="basis-1/5">
        <MobileNav
          to="/chats"
          LinkStyles="w-full flex flex-col items-center"
          activeIcon={
            <PiChatTeardropTextFill
              size={25}
              className={`${menuStyles} fill-current`}
            />
          }
          staleIcon={
            <PiChatTeardropTextThin
              size={25}
              className={`${menuStyles} stroke-current`}
            />
          }
          text="Chats"
        />
      </div>
      <div className="basis-1/5">
        <MobileNav
          to="notifications"
          LinkStyles="basis-1/4 flex flex-col items-center"
          activeIcon={
            <HiBell size={25} className={`${menuStyles} fill-current `} />
          }
          staleIcon={
            <HiBell
              className={`${menuStyles} fill-transparent stroke-1 stroke-current `}
              size={25}
            />
          }
          text="Notifications"
        />
      </div>
      <div className="basis-1/5">
        {" "}
        <MobileNav
          to="settings"
          LinkStyles="basis-1/4 flex flex-col items-center"
          activeIcon={
            <HiCog size={25} className={`${menuStyles} fill-current `} />
          }
          staleIcon={
            <HiCog
              className={`${menuStyles} fill-transparent stroke-1 stroke-current `}
              size={25}
            />
          }
          text="Settings"
        />
      </div>
      <div className="basis-1/5 flex justify-center">
        {" "}
        <ProfileImage width="w-12" height="h-12" />
      </div>
    </ul>
  );
}

export default MobileMenu;
