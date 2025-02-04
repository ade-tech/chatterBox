function Recepient({ name, status }) {
  return (
    <div className="flex flex-col">
      <h2 className="p-0 m-0 text-lg dark:text-white font-semibold">{name}</h2>
      <p className="p-0 m-0 text-xm text-gray-500 dark:text-gray-400">
        {status}
      </p>
    </div>
  );
}

export default Recepient;
