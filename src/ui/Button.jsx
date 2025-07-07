import SpinnerMini from "./SpinnerMini";

function Button({
  name,
  onClick,
  disabled,
  isLoading,
  styles = "h-12 w-full",
  type,
  ButtonStyletype = "default",
}) {
  console.log(isLoading)
  const commonStyles = `rounded-full font-medium mt-6 transition-all ${
    disabled ? " cursor-not-allowed" : "cursor-pointer"
  }`;

  if (ButtonStyletype === "default")
    return (
      <button
        className={`${styles} ${
          disabled ? "cursor-not-allowed hover:bg-secondary-dark flex items-center justify-center text-white" : ""
        } ${commonStyles} bg-secondary-dark hover:bg-accent-light text-white`}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        type={type}
      >
        {isLoading ? <SpinnerMini/> : name}
      </button>
    );

  if (ButtonStyletype === "secondary")
    return (
      <button
        className={
          isLoading
            ? `bg-accent-light`
            : `${styles} ${commonStyles} ${
                disabled ? "cursor-not-allowed" : ""
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
