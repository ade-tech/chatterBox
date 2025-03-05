function Recepient({ name, status }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-md m-0 p-0 font-semibold md:text-lg dark:text-white">
        {name}
      </h2>
      <p
        className={`${
          status === "Online"
            ? "dark:text-primary-dark font-bold"
            : "dark:text-gray-400"
        } m-0 p-0 text-xs md:text-sm`}
      >
        {status}
      </p>
    </div>
  );
}

export default Recepient;
