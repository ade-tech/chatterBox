import supabase from "./supabase";

export async function emailSignup({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!data) throw new Error("No data retrieved");
    if (error) throw new Error(error);

    console.log(data);
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
}
