import Heading from "./Heading";

function Empty({ icon, context, info }) {
  return (
    <div className="w-full h-auto flex flex-col items-center flex-grow justify-center text-lg">
      <div className="flex flex-col items-center justify-start">
        {icon}
        <Heading>{context} is empty</Heading>
        <p className="text-sm text-gray-400 font-extralight dark:text-surface-light">
          {info}
        </p>
      </div>
    </div>
  );
}

export default Empty;
