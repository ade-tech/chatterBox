import SignupForm from "../features/Authentication/SignupForm";
import OnBoardingSide from "../ui/onBoardingSide";

function Signup() {
  return (
    <div className="dark:bg-dark flex h-[100dvh] w-full">
      <SignupForm />
      <OnBoardingSide />
    </div>
  );
}

export default Signup;
