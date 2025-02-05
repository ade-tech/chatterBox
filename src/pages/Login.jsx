import LoginForm from "../features/Authentication/LoginForm";
import OnBoardingSide from "../ui/onBoardingSide";

function Login() {
  return (
    <div className="w-full h-screen flex dark:bg-dark">
      <OnBoardingSide />
      <LoginForm />
    </div>
  );
}

export default Login;
