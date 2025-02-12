import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, UpdateProfile } from "../../services/ProfileApi";
import { UseCurrentUserData } from "../../contexts/CurrentUserContext";

export function GetProfileData() {
  const { user_id: currentUserID, isGettingUser } = UseCurrentUserData();

  let searchID = currentUserID;
  const { data, isLoading } = useQuery({
    queryKey: [`userProfile--{${searchID}}`, searchID],
    queryFn: ({ queryKey }) => {
      const [, searchUser] = queryKey.at(0).split("--");
      return getUserProfile(searchUser);
    },
  });

  return { data, isLoading, isGettingUser };
}
export function GetRecepientProfile(id) {
  const { data, isLoading } = useQuery({
    queryKey: [`userProfile--{${id}}`, id],
    queryFn: ({ queryKey }) => {
      const [, searchUser] = queryKey.at(0).split("--");
      return getUserProfile(searchUser);
    },
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
