import { BounceLoader } from "react-spinners";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data, isLoading, error } = useCurrentUser();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center dark:bg-dark">
        <BounceLoader color="#9e7ffb" size={120} />
      </div>
    );
  if (error)
    return (
      <div className="w-screen h-screen items-center justify-center">
        No Internet
      </div>
    );

  if (!data || data.role !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  if (data.role === "authenticated") return children;
}

export default ProtectedRoute;
