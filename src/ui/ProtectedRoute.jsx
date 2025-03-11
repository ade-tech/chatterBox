import { BounceLoader } from "react-spinners";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import { Navigate } from "react-router-dom";
import { GetRecepientProfile } from "../features/profile/useProfile";

function ProtectedRoute({ children }) {
  const { data, isLoading, error } = useCurrentUser();
  const { data: profile, isLoading: isChecking } = GetRecepientProfile(
    data?.id,
  );

  const hasProfile = profile?.email;

  if (isLoading || isChecking)
    return (
      <div className="dark:bg-dark flex h-screen w-screen items-center justify-center">
        <BounceLoader color="#9e7ffb" size={120} />
      </div>
    );
  if (error) return <Navigate to="/get-in" replace />;

  if (!data || data.role !== "authenticated") {
    return <Navigate to="/get-in" replace />;
  }

  if (data.role === "authenticated" && hasProfile) return children;
  if (data.role === "authenticated" && !hasProfile)
    return <Navigate to="/onboarding" replace />;
}

export default ProtectedRoute;
