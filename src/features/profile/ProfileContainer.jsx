import { HiOutlinePencil } from "react-icons/hi";
import ProfileImage from "../../ui/Profile";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GetProfileData, useUpdateUSerProfile } from "./useProfile";
import Spinner from "../../ui/Spinner";
import { toast } from "react-toastify";

function ProfileContainer() {
  const [preview, setPreview] = useState(null);
  const [isEditting, setIsEditting] = useState(false);
  const { data, isLoading, isGettingUser } = GetProfileData();
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
      }
    );
  }
  if (isLoading || isGettingUser) return <Spinner />;

  return (
    <div className="w-full flex items-center justify-center flex-col">
      {!isEditting && (
        <>
          <ProfileImage
            width="w-24"
            height="h-24"
            styles="mt-8 mb-5"
            type="image"
            image={avatar_url}
          />
          <h1 className="text-xl font-semibold dark:text-accent-light">
            {fullName ? fullName : "No Username"}
          </h1>
          <p className="text-gray-500 dark:text-accent-dark">@{username}</p>
        </>
      )}
      {!isEditting && (
        <button
          onClick={() => setIsEditting(true)}
          className="cursor-pointer flex items-center mt-6 bg-primary-light text-white px-4 py-2 rounded-full"
        >
          <HiOutlinePencil className="mr-1.5 " /> Edit Profile
        </button>
      )}
      <form
        className="w-full mt-8 flex flex-col justify-center items-center"
        onSubmit={handleSubmit(submitFn)}
      >
        {isEditting && (
          <>
            <div className="flex w-full gap-1 px-10 mb-8 relative">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer flex items-center"
              >
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden dark:text-accent-light border ${
                    selectedFile
                      ? "border-green-500"
                      : errors?.avatar_url?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <span className="absolute top-12 font-semibold text-sm left-6 text-center">
                    Upload <br />
                    Image
                  </span>
                  <img
                    src={preview || "/default-user.jpg"}
                    alt="Profile"
                    className="w-full h-full opacity-20 object-cover"
                  />
                </div>
              </label>
              <div className="h-full flex-grow ml-3 flex flex-col items-center justify-center gap-2">
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
        <div className=" w-3/4">
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
        <div className="w-full flex gap-2 items-center justify-center">
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
  );
}

export default ProfileContainer;
