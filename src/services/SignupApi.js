import supabase from "./supabase";

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
