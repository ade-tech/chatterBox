import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  UpdateProfile,
  updateLastSeen as updateLastSeenApi,
} from "../../services/ProfileApi";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";

export function GetProfileData() {
  const { user_id, isGettingUser } = UseCurrentUserData();
  const { data, isLoading } = useQuery({
    queryKey: [`userProfile--{${user_id}}`, user_id],
    queryFn: () => {
      return getUserProfile(user_id);
    },
    enabled: !!user_id,
  });

  return { data, isLoading, isGettingUser };
}
export function GetRecepientProfile(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
    enabled: !!id,
  });
  return { data, isLoading };
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
export function UseLastSeen() {
  const { mutate: updateLastSeen, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, last_seen }) =>
      updateLastSeenApi({ id, lastSeen: last_seen }),
  });

  return { updateLastSeen, isUpdating };
}
