import supabase, { supabaseUrl } from "./supabase";
export const UpdateProfile = async ({ user_id, profileData }) => {
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
    .eq("user_id", user_id)
    .select();
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

export const getUserProfile = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) throw new Error("Could not get your profile");

  return data;
};
