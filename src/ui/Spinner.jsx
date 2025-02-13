import { BounceLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <BounceLoader size={120} color="#6f00ff" speedMultiplier={1.5} />
    </div>
  );
}

export default Spinner;
