import { BounceLoader } from "react-spinners";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <BounceLoader color="#9e7ffb" size={120} />
      </div>
    );

  if (!data.length)
    navigate("/login", {
      replace: true,
    });

  if (data.role === "authenticated") return children;
}

export default ProtectedRoute;
