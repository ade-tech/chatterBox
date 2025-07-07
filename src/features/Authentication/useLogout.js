import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/LoginApi";
import { toast } from "react-toastify";

/**
 * Custom hook to handle user logout.
 * @returns {Object} The logout function and loading state.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLogginOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();

      toast.success("Bye👋 , see you next time");
    },
  });

  return { logoutUser, isLogginOut };
}
