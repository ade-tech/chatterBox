import { Link } from "react-router-dom";

/**
 * Logo component for displaying the application logo.
 * @param {Object} props - The component props.
 * @param {string} props.styles - Additional styles for the logo.
 * @returns {JSX.Element} The Logo component.
 */
function Logo({ styles }) {
  return (
    <Link className={styles} to="/">
      <img src="/Asset 1.svg" alt="Logo Image" className="w-8" />
    </Link>
  );
}

export default Logo;
