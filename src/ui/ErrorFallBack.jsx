import Button from "./Button";

function ErrorFallBack({ resetErrorBoundary }) {
  return (
    <div className="dark:bg-dark flex h-[100dvh] w-full items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <img src="/error.webp" alt="" className="w-54" />
        <h1 className="dark:text-accent-light px-3 text-4xl font-semibold">
          Something went wrong...
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-white">
          Something isn't working, it's not you, it us <br /> we'll fix that
          right away!
        </p>
        <Button
          styles="w-42 h-10"
          name="Back to Home &rarr;"
          onClick={resetErrorBoundary}
        />
      </div>
    </div>
  );
}

export default ErrorFallBack;
