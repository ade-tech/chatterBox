import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInApi } from "../../services/LoginApi";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => logInApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Login Success");
    },
    onError: () => toast.error("Check your Input"),
  });

  return { login, isLoggingIn };
}
