import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProfile,
  GetInWithOTP,
  GetInWithGoogle as GetInWithGoogleApi,
  sendOTP,
} from "../../services/SignupApi";

/**
 * Custom hook to handle user signup.
 * @returns {Object} The signup function and loading state.
 */
export function useCreateProfile() {
  const { mutate: createUserProfile, isLoading: isCreatingProfile } =
    useMutation({
      mutationFn: ({
        email,
        bio,
        user_id,
        username,
        fullName,
        phoneNumber,
        avatar,
      }) =>
        createProfile({
          email,
          bio,
          user_id,
          username,
          fullName,
          phoneNumber,
          avatar,
        }),
    });

  return { createUserProfile, isCreatingProfile };
}

export function useGetIn() {
  const queryClient = useQueryClient();
  const { mutate: getIn, isLoading: isGettingIn } = useMutation({
    mutationFn: ({ email, token }) => GetInWithOTP({ email, token }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
    },
  });

  return { getIn, isGettingIn };
}

export function GetInWithGoogleFn() {
  const { mutate: GetInWithGoogle, isLoading } = useMutation({
    mutationFn: () => GetInWithGoogleApi(),
  });
  return { GetInWithGoogle, isLoading };
}

export const useOTP = () => {
  const { mutate: getOTP, isLoading: isGettingOTP } = useMutation({
    mutationFn: (email) => sendOTP(email),
  });

  return { getOTP, isGettingOTP };
};
