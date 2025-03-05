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
      className="flex w-full flex-col items-center"
      role="li"
    >
      {({ isActive }) => (
        <>
          {isActive ? ActiveIcon : staleIcon}
          <span
            className={
              isActive
                ? "text-dark dark:text-accent-light text-primary text-sm font-bold"
                : "text-dark dark:text-accent-light text-sm font-medium"
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
