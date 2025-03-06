import { HiOutlinePencil } from "react-icons/hi";
import ProfileImage from "../../ui/Profile";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GetRecepientProfile, useUpdateUSerProfile } from "./useProfile";
import Spinner from "../../ui/Spinner";
import Logout from "../../ui/Logout";

import { toast } from "react-toastify";
import { useCurrentUser } from "../Authentication/useCurrentUser";

function ProfileContainer() {
  const [preview, setPreview] = useState(null);
  const { data: user, isLoading: isGettingUser, error } = useCurrentUser();
  const { data, isLoading } = GetRecepientProfile(user?.id);
  const [isEditting, setIsEditting] = useState(false);
  const { bio, avatar_url, username, fullName, phoneNumber, user_id } =
    data || {};
  const { control, watch, formState, handleSubmit, register, reset } = useForm({
    defaultValues: {
      bio,
      username,
      fullName,
      phoneNumber,
      avatar_url,
    },
  });
  const { errors } = formState;
  const selectedFile = watch("profilePicture");
  const { updateUser, isUpdatingUser } = useUpdateUSerProfile();
  useEffect(() => {
    if (data) {
      reset({
        bio: data.bio || "",
        username: data.username || "",
        fullName: data.fullName || "",
        phoneNumber: data.phoneNumber || "",
        avatar_url: data.avatar_url || "",
      });
    }
  }, [data, reset]);

  function submitFn(data) {
    updateUser(
      { user_id, profileData: data },
      {
        onSuccess: () => {
          toast.success("User Profile updated");
          setIsEditting(false);
        },
      },
    );
  }
  if (isLoading || isGettingUser) return <Spinner />;

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        {!isEditting && (
          <>
            <ProfileImage
              width="w-24"
              height="h-24"
              styles="mt-8 mb-5"
              type="image"
              image={avatar_url}
            />
            <h1 className="dark:text-accent-light text-xl font-semibold">
              {fullName ? fullName : "No Username"}
            </h1>
            <p className="dark:text-accent-dark text-gray-500">@{username}</p>
          </>
        )}
        {!isEditting && (
          <button
            onClick={() => setIsEditting(true)}
            className="bg-primary-light mt-6 flex cursor-pointer items-center rounded-full px-4 py-2 text-white"
          >
            <HiOutlinePencil className="mr-1.5" /> Edit Profile
          </button>
        )}
        <form
          className="mt-8 flex w-full flex-col items-center justify-center"
          onSubmit={handleSubmit(submitFn)}
        >
          {isEditting && (
            <>
              <div className="relative mb-8 flex w-full gap-1 px-10">
                <label
                  htmlFor="image-upload"
                  className="relative flex cursor-pointer items-center"
                >
                  <div
                    className={`dark:text-accent-light h-24 w-24 overflow-hidden rounded-full border ${
                      selectedFile
                        ? "border-green-500"
                        : errors?.avatar_url?.message
                          ? "border-red-500"
                          : "border-gray-300"
                    }`}
                  >
                    <span className="absolute top-12 left-6 text-center text-sm font-semibold">
                      Upload <br />
                      Image
                    </span>
                    <img
                      src={preview || "/default-user.jpg"}
                      alt="Profile"
                      className="h-full w-full object-cover opacity-20"
                    />
                  </div>
                </label>
                <div className="ml-3 flex h-full flex-grow flex-col items-center justify-center gap-2">
                  <FormInput
                    styles="w-56 h-10 bg-gray-50 rounded-full focus:outline-none pl-6"
                    error={errors?.fullName?.message}
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full Name cannot be empty",
                    })}
                  />
                  <FormInput
                    styles="w-56 h-10 bg-gray-50 rounded-full focus:outline-none pl-6"
                    error={errors?.username?.message}
                    placeholder="Username"
                    {...register("username", {
                      required: "Username cannot be empty",
                    })}
                  />
                </div>

                <Controller
                  control={control}
                  name="avatar_url"
                  rules={{
                    validate: {
                      isImage: (file) => {
                        if (!file || typeof file !== "object") return true;
                        return (
                          file.type.startsWith("image/") ||
                          "File must be an image"
                        );
                      },
                      isSizeValid: (file) => {
                        if (!file || typeof file !== "object") return true;
                        return (
                          file.size <= 5 * 1024 * 1024 ||
                          "File size must be less than 5MB"
                        );
                      },
                    },
                  }}
                  render={({ field }) => {
                    return (
                      <FormInput
                        id="image-upload"
                        type="file"
                        styles="hidden w-0"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setPreview(URL.createObjectURL(file));
                          field.onChange(file);
                        }}
                      />
                    );
                  }}
                />
              </div>
            </>
          )}
          <div className="w-3/4">
            <FormInput
              label="Bio"
              placeholder="I am using ChatterBox by Abdone"
              disabled={!isEditting}
              styles="w-full "
              type="text"
              {...register("bio", {
                required: "Bio cannot be empty",
              })}
              error={errors?.bio?.message}
            />
          </div>
          <div className="w-3/4">
            <FormInput
              label="Phone Number"
              styles="w-full"
              placeholder="090 - 419 -7626 -21"
              type="text"
              {...register("phoneNumber", {
                required: "Bio cannot be empty",
              })}
              error={errors?.phoneNumber?.message}
              disabled={!isEditting}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            {isEditting && (
              <>
                <Button
                  name={isGettingUser ? "Editing..." : "Save Edits"}
                  disabled={!formState.isDirty || isUpdatingUser}
                  styles="w-2/6 px-4 py-2"
                  type="submit"
                />

                <Button
                  name="Cancel"
                  styles="w-1/4 px-4 py-2"
                  ButtonStyletype="secondary"
                  type="submit"
                  disabled={formState.isDirty}
                  onClick={() => setIsEditting(false)}
                />
              </>
            )}
          </div>
        </form>
      </div>
      <Logout type="long" />
    </>
  );
}

export default ProfileContainer;
