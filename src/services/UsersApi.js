import supabase from "./supabase";

/**
 * Retrieves all users except the specified user ID.
 * @param {string} id - The user ID to exclude from the results.
 * @returns {Array} The list of all users except the specified user.
 * @throws {Error} If there is an error retrieving the users.
 */
export const getAllUser = async (id) => {
  const { data: AllUsers, error: usersLoadingError } = await supabase
    .from("profiles")
    .select("*")
    .neq("user_id", id);
  if (usersLoadingError) throw new Error(usersLoadingError.message);

  return AllUsers;
};
