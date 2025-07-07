import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInApi } from "../../services/LoginApi";
import { toast } from "react-toastify";

/**
 * Custom hook to handle user login.
 * @returns {Object} The login function, loading state, error state, and error message.
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLoggingIn,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => logInApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Login Success");
    },
    onError: (error) =>
      toast.error(
        `${
          error.message === "Failed to fetch"
            ? "Check your Internet Connection"
            : "Credentials might not be correct"
        }`
      ),
  });

  return { login, isLoggingIn, error, isError };
}
