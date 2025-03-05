function ChatPreloader() {
  return (
    <div className="mb-2 flex w-full animate-pulse cursor-pointer items-center justify-start gap-4 py-2 pl-4">
      <div className="dark:bg-surface-dark h-12 w-12 rounded-full bg-gray-200"></div>
      <div className="flex flex-col gap-2">
        <div className="dark:bg-surface-dark h-5 w-60 rounded-3xl bg-gray-200"></div>
        <div className="dark:bg-surface-dark h-4 w-54 rounded-2xl bg-gray-200"></div>
      </div>
      <div className="dark:bg-surface-dark h-4 w-12 rounded-2xl bg-gray-200"></div>
    </div>
  );
}

export function ChatHeaderpreloader() {
  return (
    <div className="mb-2 flex w-full animate-pulse cursor-pointer items-center justify-start gap-3 py-2 pl-4">
      <div className="dark:bg-surface-dark h-12 w-12 rounded-full bg-gray-200"></div>
      <div className="flex flex-col gap-2">
        <div className="dark:bg-surface-dark h-5 w-60 rounded-3xl bg-gray-200"></div>
        <div className="dark:bg-surface-dark h-4 w-54 rounded-2xl bg-gray-200"></div>
      </div>
    </div>
  );
}
const basicStyles = "w-64 , h-14 py-2 px-5 rounded-3xl";

export function MessagePreLoader() {
  return (
    <>
      <div className="w-full animate-pulse">
        <div className="mb-3 w-full">
          <div className={`${basicStyles} bg-primary-light ml-auto`}></div>
        </div>
      </div>
      <div className="w-full">
        <div className="mb-3 w-full">
          <div
            className={`${basicStyles} dark:bg-bg-dark mr-auto bg-gray-100 dark:border-transparent`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ChatPreloader;
