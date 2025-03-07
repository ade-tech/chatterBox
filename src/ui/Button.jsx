import { MoonLoader } from "react-spinners";

function Button({
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
        className={`${styles} ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        } ${commonStyles} bg-secondary-dark hover:bg-accent-light text-white`}
        onClick={!disabled && onClick}
        disabled={disabled}
        type={type}
      >
        {isLoading ? <MoonLoader size={30} color="#9e7ffb" /> : name}
      </button>
    );

  if (ButtonStyletype === "secondary")
    return (
      <button
        className={
          isLoading
            ? `bg-accent-light`
            : `${styles} ${commonStyles} ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              } text-dark border border-gray-400 bg-white hover:bg-gray-50`
        }
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
      >
        {isLoading ? "Loading..." : name}
      </button>
    );
}

export default Button;
