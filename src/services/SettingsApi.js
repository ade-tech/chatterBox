import supabase from "./supabase";

export async function getSettings(id) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateSettings({ id, data }) {
  const { error } = await supabase
    .from("settings")
    .update(data.field, data.value)
    .eq("user_id", id);

  if (error) throw new Error(error.messages);
}
