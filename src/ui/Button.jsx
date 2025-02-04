function Button({ name, onClick }) {
  return (
    <button
      className="w-full rounded-full text-white font-medium bg-secondary-dark mt-6 h-10"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
