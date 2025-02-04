function ReceiverChat({ message, type, time }) {
  if (type === "sender")
    return (
      <div className="w-full mb-2">
        <div className="max-w-96 w-fit ml-auto bg-primary-light py-2 px-5 rounded-3xl">
          <p className="text-white">{message}</p>
          <p className="text-xs text-gray-400 text-left pr-3 w-full">{time}</p>
        </div>
      </div>
    );

  if (type === "receiver")
    return (
      <div className="w-full mb-2">
        <div className="max-w-96 w-fit mr-auto bg-primary-transparent py-2 px-3 rounded-3xl border border-gray-200 dark:bg-bg-dark dark:border-transparent">
          <p className="text-dark dark:text-white">{message}</p>
          <p className="text-xs text-gray-500 text-right pr-3 w-full">{time}</p>
        </div>
      </div>
    );
}

export default ReceiverChat;
