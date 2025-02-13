import supabase from "./supabase";

/**
 * Signs up a new user with email, password, and username.
 * @param {Object} param0 - The signup details.
 * @param {string} param0.email - The user's email.
 * @param {string} param0.password - The user's password.
 * @param {string} param0.username - The user's username.
 * @returns {Object} The signup response data.
 * @throws {Error} If there is an error during signup.
 */
export async function emailSignup({ email, password, username }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    const userId = data?.user?.id;

    if (!userId) throw new Error("User ID not found");

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ user_id: userId, username }]);

    if (profileError) throw new Error(profileError.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
