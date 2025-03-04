import { BounceLoader } from "react-spinners";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import { Navigate } from "react-router-dom";
import { checkUserExistence } from "../services/SignupApi";

function ProtectedRoute({ children }) {
  const { data, isLoading, error } = useCurrentUser();
  const { data: profile } = checkUserExistence(data?.user?.id);

  const hasProfile = data?.length > 0;

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center dark:bg-dark">
        <BounceLoader color="#9e7ffb" size={120} />
      </div>
    );
  if (error) return <Navigate to="/login" replace />;

  if (!data || data.role !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  if (data.role === "authenticated" && hasProfile) return children;
  if (data.role === "authenticated" && !hasProfile)
    return <Navigate to="/onboarding" replace />;
}

export default ProtectedRoute;
