import { Link } from "react-router-dom";

function Logo({ styles }) {
  return (
    <Link className={styles} to="/">
      <img src="/Asset 1.svg" alt="Logo Image" className="w-8" />
    </Link>
  );
}

export default Logo;
