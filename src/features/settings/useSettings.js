import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../../services/SettingsApi";
import { toast } from "react-toastify";

export function useUserSettings(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user-settings"],
    queryFn: () => getSettings(id),
    enabled: !!id,
  });

  return { data, isLoading };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingSttings } = useMutation({
    mutationFn: ({ id, data }) => updateSettings({ id, data }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Settings updated ✅");
      queryClient.setQueryData(["current-user-settings"], data);
    },
    onError: () => toast.error("An error occured ❌"),
  });

  return { updateUser, isUpdatingSttings };
}
