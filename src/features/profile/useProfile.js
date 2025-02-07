import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, UpdateProfile } from "../../services/ProfileApi";
import { useUser } from "../../hooks/useUser";

export function GetProfileData() {
  const { userData, isGettingUser } = useUser();
  const { data, isLoading } = useQuery({
    queryFn: () => getUserProfile(userData?.id),
    queryKey: ["userProfile", userData?.id],
  });
  return { data, isLoading, isGettingUser };
}

export function useUpdateUSerProfile() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: ({ user_id, profileData }) =>
      UpdateProfile({ user_id, profileData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });

  return { updateUser, isUpdatingUser };
}
