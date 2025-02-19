function ChatPreloader() {
  return (
    <div className="w-full gap-4 mb-2 flex justify-start pl-4 py-2 items-center cursor-pointer animate-pulse">
      <div className="w-12 h-12 bg-gray-200 dark:bg-surface-dark rounded-full"></div>
      <div className="flex flex-col gap-2">
        <div className="w-60 h-5 rounded-3xl bg-gray-200 dark:bg-surface-dark  "></div>
        <div className="w-54 h-4 rounded-2xl bg-gray-200 dark:bg-surface-dark "></div>
      </div>
      <div className="w-12 h-4 rounded-2xl bg-gray-200 dark:bg-surface-dark "></div>
    </div>
  );
}

export function ChatHeaderpreloader() {
  return (
    <div className="w-full gap-3 mb-2 flex justify-start pl-4 py-2 items-center cursor-pointer animate-pulse">
      <div className="w-12 h-12 bg-gray-200 dark:bg-surface-dark rounded-full"></div>
      <div className="flex flex-col gap-2">
        <div className="w-60 h-5 rounded-3xl bg-gray-200 dark:bg-surface-dark  "></div>
        <div className="w-54 h-4 rounded-2xl bg-gray-200 dark:bg-surface-dark "></div>
      </div>
    </div>
  );
}
const basicStyles = "w-64 , h-14 py-2 px-5 rounded-3xl";

export function MessagePreLoader() {
  return (
    <>
      <div className="w-full animate-pulse">
        <div className="w-full mb-3">
          <div className={`${basicStyles} ml-auto bg-primary-light`}></div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full mb-3">
          <div
            className={`${basicStyles} mr-auto bg-gray-100 dark:bg-bg-dark dark:border-transparent`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ChatPreloader;
