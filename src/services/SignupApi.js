import supabase, { supabaseUrl } from "./supabase";

/**
 * Signs up a new user with email, password, and username.
 * @param {Object} param0 - The signup details.
 * @param {string} param0.email - The user's email.
 * @param {string} param0.password - The user's password.
 * @param {string} param0.username - The user's username.
 * @returns {Object} The signup response data.
 * @throws {Error} If there is an error during signup.
 */
export async function createProfile({
  email,
  user_id,
  bio,
  username,
  fullName,
  phoneNumber,
  avatar,
}) {
  try {
    const fileName = `${crypto.randomUUID()}`;
    const filePath = `${supabaseUrl}/storage/v1/object/public/userProfile/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("userProfile")
      .upload(fileName, avatar);

    if (uploadError) throw new Error("could not upload image");

    const { data, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id,
          bio,
          email,
          username,
          fullName,
          phoneNumber,
          avatar_url: filePath,
        },
      ]);

    if (profileError) throw new Error(profileError.message);

    const { error: settingsError } = await supabase
      .from("settings")
      .insert([{ user_id }]);

    if (settingsError) return;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendOTP(email) {
  const userCheck = await checkUserAuthMethod(email);

  console.log("ran this fn", userCheck, email);
  if (userCheck) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) throw new Error(error.message);
  } else if (!userCheck) {
    throw new Error("User already sign in with Social OAuth");
  }
}

export async function GetInWithOTP({ email, token }) {
  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (verifyError) throw new Error(verifyError.message);

  return data;
}

export async function checkUserExistence(id) {
  if (!id) return;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id);
  if (error) throw new Error(error.message);

  return data;
}

export async function GetInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) throw new Error(error.message);
}

async function checkUserAuthMethod(email) {
  const { data } = await supabase
    .from("profiles")
    .select("auth_type")
    .eq("email", email);

  console.log("checkUserAuthMethod data:", data);

  if (!data.length) return true;
  if (data[0].auth_type === "email") return true;

  return false;
}
