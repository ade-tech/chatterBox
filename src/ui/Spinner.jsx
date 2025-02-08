import { BounceLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <BounceLoader size={120} color="#6f00ff" speedMultiplier={2} />
    </div>
  );
}

export default Spinner;
