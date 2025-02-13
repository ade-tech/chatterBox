import { useMutation } from "@tanstack/react-query";
import { emailSignup } from "../../services/SignupApi";

/**
 * Custom hook to handle user signup.
 * @returns {Object} The signup function and loading state.
 */
export function useSignup() {
  const { mutate: signUp, isLoading: isSigninUp } = useMutation({
    mutationFn: ({ email, password, username, fullName, phoneNumber }) =>
      emailSignup({ email, password, username, fullName, phoneNumber }),
  });

  return { signUp, isSigninUp };
}
