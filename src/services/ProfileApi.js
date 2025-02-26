import supabase, { supabaseUrl } from "./supabase";

/**
 * Updates the user profile with the provided profile data.
 * @param {Object} param0 - The profile update details.
 * @param {string} param0.user_id - The user ID.
 * @param {Object} param0.profileData - The profile data to update.
 * @param {string} [param0.profileData.bio] - The user's bio.
 * @param {string} [param0.profileData.username] - The user's username.
 * @param {string} [param0.profileData.fullName] - The user's full name.
 * @param {string} [param0.profileData.phoneNumber] - The user's phone number.
 * @param {File|string} [param0.profileData.avatar_url] - The user's avatar URL or file.
 * @returns {Object} The updated profile data.
 * @throws {Error} If there is an error updating the profile.
 */
export const UpdateProfile = async ({ user_id, profileData }) => {
  console.log(profileData);
  const hasImage =
    typeof profileData.avatar_url === "string" &&
    profileData.avatar_url.startsWith(supabaseUrl);

  const profileUploadData = {
    bio: profileData?.bio,
    username: profileData?.username,
    fullName: profileData?.fullName,
    phoneNumber: profileData?.phoneNumber,
  };

  const imageName = !hasImage
    ? `/${user_id}-${Date.now()}-${profileData.avatar_url.name}`.replaceAll(
        /\s+/g,
        "_"
      )
    : null;

  const imagePath = hasImage
    ? profileData.avatar_url
    : `${supabaseUrl}/storage/v1/object/public/userProfile/${imageName}`;

  console.log(imageName);
  const { data: profileUpdate, error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: imagePath, ...profileUploadData })
    .eq("user_id", user_id);
  console.log(imageName, profileUpdate);

  if (profileError)
    throw new Error("Could not Update your profile, try again later");

  if (hasImage) return profileUpdate;

  if (profileError)
    throw new Error("Could not update your profile, try again later");

  if (imageName) {
    const { error } = await supabase.storage
      .from("userProfile")
      .upload(imageName, profileData.avatar_url);

    if (error) throw new Error("Image could not be uploaded");
  }

  const { data: urlData } = supabase.storage
    .from("userProfile")
    .getPublicUrl(imageName);

  console.log(urlData);

  return profileUpdate;
};

/**
 * Retrieves the user profile for a given user ID.
 * @param {string} id - The user ID.
 * @returns {Object} The user profile data.
 * @throws {Error} If there is an error retrieving the profile.
 */
export const getUserProfile = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) throw new Error("Could not get your profile");

  return data;
};

export const updateLastSeen = async ({ id, lastSeen }) => {
  console.log(id, lastSeen);
  const { data, error } = await supabase
    .from("profiles")
    .update({ last_seen: lastSeen })
    .eq("user_id", id)
    .select();

  if (error) throw new Error("Could not update the last Seen");

  return data;
};
