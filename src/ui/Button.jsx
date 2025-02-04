import { MoonLoader } from "react-spinners";

function Button({ name, onClick, disabled, isLoading }) {
  return (
    <button
      className="w-full rounded-full text-white font-medium bg-secondary-dark mt-6 h-10 cursor-pointer hover:bg-accent-light"
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <MoonLoader size={30} color="#9e7ffb" /> : name}
    </button>
  );
}

export default Button;
