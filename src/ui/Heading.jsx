/**
 * Heading component for displaying a heading.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The heading content.
 * @returns {JSX.Element} The Heading component.
 */
function Heading({ children }) {
  return (
    <h1 className="ml-2 font-bold  text-3xl text-bg-dark dark:text-accent-dark mb-3">
      {children}
    </h1>
  );
}

export default Heading;
