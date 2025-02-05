import { NavLink } from "react-router-dom";

function MobileNav({ to, LinkStyles, activeIcon, staleIcon, text }) {
  return (
    <NavLink to={to} className={LinkStyles} role="li">
      {({ isActive }) => (
        <>
          {isActive ? activeIcon : staleIcon}
          <span
            className={
              isActive
                ? "font-bold text-sm text-dark dark:text-accent-light text-primary"
                : "text-dark text-sm font-medium dark:text-accent-light"
            }
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default MobileNav;
