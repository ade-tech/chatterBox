import supabase from "./supabase";

export async function getSettings(id) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateSettings({ id, data: inputData }) {
  const { data, error } = await supabase
    .from("settings")
    .update({ [inputData.field]: inputData.value })
    .eq("user_id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.messages);
  }

  console.log(data);
  return data;
}
