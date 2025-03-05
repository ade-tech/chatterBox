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
      className="bg-light transiton-all dark:bg-dark dark:border-bg-dark fixed bottom-0 z-[100] flex h-fit w-full items-center justify-around border-t border-t-gray-200 pt-6 pb-4 duration-700 md:hidden"
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
            <HiBell size={25} className={`${menuStyles} fill-current`} />
          }
          staleIcon={
            <HiBell
              className={`${menuStyles} fill-transparent stroke-current stroke-1`}
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
            <HiCog size={25} className={`${menuStyles} fill-current`} />
          }
          staleIcon={
            <HiCog
              className={`${menuStyles} fill-transparent stroke-current stroke-1`}
              size={25}
            />
          }
          text="Settings"
        />
      </div>
      <div className="flex basis-1/5 justify-center">
        {" "}
        <ProfileImage width="w-12" height="h-12" image={data?.avatar_url} />
      </div>
    </ul>
  );
}

export default MobileMenu;
