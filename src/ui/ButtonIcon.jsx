import { MoonLoader } from "react-spinners";
/** * Button component for rendering a button with loading state. * @param {Object} props - The component props. * @param {string} props.name - The button text. * @param {Function} props.onClick - The click handler function. * @param {boolean} props.disabled - Whether the button is disabled. * @param {boolean} props.isLoading - Whether the button is in loading state. * @param {string} [props.styles="h-12 w-full"] - Additional styles for the button. * @param {string} props.type - The button type. * @param {string} [props.ButtonStyletype="default"] - The button style type. * @returns {JSX.Element} The Button component. */ function Button({
  name,
  onClick,
  disabled,
  isLoading,
  styles = "h-12 w-full",
  type,
  ButtonStyletype = "default",
}) {
  const commonStyles = `rounded-full font-medium mt-6 transition-all ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;
  if (ButtonStyletype === "default")
    return (
      <button
        className={`${styles} ${commonStyles} text-white bg-secondary-dark hover:bg-accent-light`}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        type={type}
      >
        {" "}
        {isLoading ? <MoonLoader size={30} color="#9e7ffb" /> : name}{" "}
      </button>
    );
  if (ButtonStyletype === "secondary")
    return (
      <button
        className={`${styles} ${commonStyles} text-dark bg-white border hover:bg-gray-50`}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
      >
        {isLoading ? <MoonLoader size={30} color="#9e7ffb" /> : name}
      </button>
    );
}

export default Button;
