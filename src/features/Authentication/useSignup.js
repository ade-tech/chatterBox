import { useMutation } from "@tanstack/react-query";
import { emailSignup } from "../../services/SignupApi";

export function useSignup() {
  const { mutate: signUp, isLoading: isSigninUp } = useMutation({
    mutationFn: ({ email, password, username }) =>
      emailSignup({ email, password, username }),
    
  });

  return { signUp, isSigninUp };
}
