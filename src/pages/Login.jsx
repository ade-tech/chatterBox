import { Navigate } from "react-router-dom";
import LoginForm from "../features/Authentication/LoginForm";
import { useCurrentUser } from "../features/Authentication/useCurrentUser";
import OnBoardingSide from "../ui/onBoardingSide";
import Spinner from "../ui/Spinner";

function Login() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading)
    return (
      <div className="h-[100vh] w-screen">
        <Spinner />
      </div>
    );

  if (data && data.role === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dark:bg-dark flex h-[100dvh] w-full">
      <OnBoardingSide />
      <LoginForm />
    </div>
  );
}

export default Login;
