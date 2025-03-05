import { NavLink } from "react-router-dom";

/**
 * MobileNav component for displaying a navigation link in the mobile menu.
 * @param {Object} props - The component props.
 * @param {string} props.to - The link destination.
 * @param {string} props.LinkStyles - Additional styles for the link.
 * @param {JSX.Element} props.activeIcon - The icon to display when the link is active.
 * @param {JSX.Element} props.staleIcon - The icon to display when the link is not active.
 * @param {string} props.text - The link text.
 * @returns {JSX.Element} The MobileNav component.
 */
function MobileNav({ to, LinkStyles, activeIcon, staleIcon, text }) {
  return (
    <NavLink to={to} className={LinkStyles} role="li">
      {({ isActive }) => (
        <>
          {isActive ? activeIcon : staleIcon}
          <span
            className={
              isActive
                ? "text-dark dark:text-accent-light text-primary text-sm font-bold"
                : "text-dark dark:text-accent-light text-sm font-medium"
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
