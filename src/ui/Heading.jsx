/**
 * Heading component for displaying a heading.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The heading content.
 * @returns {JSX.Element} The Heading component.
 */
function Heading({ children }) {
  return (
    <h1 className="text-bg-dark dark:text-accent-dark mb-3 ml-2 text-3xl font-bold">
      {children}
    </h1>
  );
}

export default Heading;
