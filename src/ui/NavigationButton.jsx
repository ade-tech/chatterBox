import { NavLink } from "react-router-dom";

/**
 * NavigationButton component for displaying a navigation button.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.ActiveIcon - The icon to display when the link is active.
 * @param {JSX.Element} props.staleIcon - The icon to display when the link is not active.
 * @param {string} props.linkTo - The link destination.
 * @returns {JSX.Element} The NavigationButton component.
 */
function NavigationButton({ ActiveIcon, staleIcon, linkTo }) {
  return (
    <NavLink
      to={linkTo}
      className="w-full flex flex-col items-center"
      role="li"
    >
      {({ isActive }) => (
        <>
          {isActive ? ActiveIcon : staleIcon}
          <span
            className={
              isActive
                ? "font-bold text-sm text-dark dark:text-accent-light text-primary"
                : "text-dark text-sm font-medium dark:text-accent-light"
            }
          >
            {linkTo}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default NavigationButton;
