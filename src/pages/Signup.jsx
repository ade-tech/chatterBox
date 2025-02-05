import SignupForm from "../features/Authentication/SignupForm";
import OnBoardingSide from "../ui/onBoardingSide";

function Signup() {
  return (
    <div className="w-full h-screen flex dark:bg-dark">
      <SignupForm />
      <OnBoardingSide />
    </div>
  );
}

export default Signup;
