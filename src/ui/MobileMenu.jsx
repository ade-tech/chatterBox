import { HiBell, HiCog } from "react-icons/hi";
import { PiChatTeardropTextFill, PiChatTeardropTextThin } from "react-icons/pi";
import ProfileImage from "./Profile";
import MobileNav from "./MobileNav";
import { GetProfileData } from "../features/profile/useProfile";
import { useEffect, useRef } from "react";

/**
 * MobileMenu component for displaying the mobile navigation menu.
 * @returns {JSX.Element} The MobileMenu component.
 */
function MobileMenu({ mobileState }) {
  const menuStyles = "text-dark dark:text-accent-light ";
  const { data } = GetProfileData();
  const ref = useRef(null);

  useEffect(() => {
    const observer = function (entries) {
      const entry = entries.at(0);

      if (entry.isIntersecting) {
        mobileState(true);
      } else {
        mobileState(false);
      }
    };
    const menuObserver = new IntersectionObserver(observer, {
      threshold: 0.5,
    });

    menuObserver.observe(ref?.current);
    const object = ref.current;

    return () => {
      menuObserver.unobserve(object);
    };
  }, [mobileState]);
  return (
    <ul
      ref={ref}
      className="w-full fixed md:hidden z-[100] bottom-0 h-fit bg-light flex items-center justify-around transiton-all duration-700 pt-6 pb-4 border-t border-t-gray-200 dark:bg-dark dark:border-bg-dark"
    >
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
        <ProfileImage width="w-12" height="h-12" image={data?.avatar_url} />
      </div>
    </ul>
  );
}

export default MobileMenu;
