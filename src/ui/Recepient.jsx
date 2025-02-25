function Recepient({ name, status }) {
  return (
    <div className="flex flex-col">
      <h2 className="p-0 m-0 text-lg dark:text-white font-semibold">{name}</h2>
      <p
        className={`${
          status === "Online"
            ? "font-bold dark:text-primary-dark"
            : "dark:text-gray-400"
        } p-0 m-0 text-xm`}
      >
        {status}
      </p>
    </div>
  );
}

export default Recepient;
