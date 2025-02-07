import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/LoginApi";
import { toast } from "react-toastify";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isLoading: isLogginOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.clear();

      // Clear local storage or session storage
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("userSession");
      toast.success("Bye👋 , see you next time");
    },
  });

  return { logoutUser, isLogginOut };
}
