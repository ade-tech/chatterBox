import Heading from "./Heading";

/**
 * Empty component for displaying an empty state message.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.icon - The icon to display.
 * @param {string} props.context - The context of the empty state.
 * @param {string} props.info - Additional information about the empty state.
 * @returns {JSX.Element} The Empty component.
 */
function Empty({ icon, context, info }) {
  return (
    <div className="flex h-auto w-full flex-grow flex-col items-center justify-center text-lg">
      <div className="flex flex-col items-center justify-start">
        {icon}
        <Heading>{context} is empty</Heading>
        <p className="dark:text-surface-light text-sm font-extralight text-gray-400">
          {info}
        </p>
      </div>
    </div>
  );
}

export default Empty;
