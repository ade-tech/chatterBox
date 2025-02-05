import { BounceLoader } from "react-spinners";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useCurrentUser();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center dark:bg-dark">
        <BounceLoader color="#9e7ffb" size={120} />
      </div>
    );

  if (!data || data.role !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
