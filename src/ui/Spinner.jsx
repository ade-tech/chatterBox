import { BounceLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="m-0 flex h-full w-full items-center justify-center p-0">
      <BounceLoader size={120} color="#6f00ff" speedMultiplier={1.5} />
    </div>
  );
}

export default Spinner;
