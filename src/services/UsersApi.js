import supabase from "./supabase";

export const getAllUser = async (id) => {
  const { data: AllUSers, error: usersLoadingError } = await supabase
    .from("profiles")
    .select("*")
    .neq("user_id", id);
  if (usersLoadingError) throw new Error(usersLoadingError.message);

  return AllUSers;
};
