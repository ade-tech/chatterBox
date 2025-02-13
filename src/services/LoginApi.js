import supabase from "./supabase";

/**
 * Retrieves the currently logged-in user.
 * @returns {Object|null} The user data or null if no session exists.
 * @throws {Error} If there is an error retrieving the session or user data.
 */
export async function getLoggedInUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error("Could not get Session");
  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data?.user;
}

/**
 * Logs out the current user.
 * @throws {Error} If there is an error during logout.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Could not log you out, try again later");
}

/**
 * Logs in a user with email and password.
 * @param {Object} param0 - The login details.
 * @param {string} param0.email - The user's email.
 * @param {string} param0.password - The user's password.
 * @returns {Object} The logged-in user data.
 * @throws {Error} If there is an error during login.
 */
export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data?.user;
}
