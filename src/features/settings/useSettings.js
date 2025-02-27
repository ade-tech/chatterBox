import { useMutation, useQuery } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../../services/SettingsApi";

export function useUserSettings(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["current-user-settings"],
    queryFn: () => getSettings(id),
    enabled: !!id,
  });

  return { data, isLoading };
}

export function useUpdateUser() {
  const { mutate: updateUser, isLoading: isUpdatingSttings } = useMutation({
    mutationFn: ({ id, data }) => updateSettings({ id, data }),
  });

  return { updateUser, isUpdatingSttings };
}
