import supabase from "./supabase";

export async function getAllChats(id) {
  console.log("Oya na", id);
  const { data, error } = await supabase
    .from("chatsparticipants")
    .select("chat_id")
    .eq("user_id", id);

  if (error) {
    throw new Error("No Chats");
  }

  const relatedChats = data?.map((chat) => chat.chat_id);

  const { data: participantData, error: fetchError } = await supabase
    .from("chatsparticipants")
    .select("user_id , chat_id, profiles(avatar_url , fullName)")
    .in("chat_id", relatedChats);

  if (fetchError) throw new Error("No Chats Available");

  const { data: lastMessages, error: chatsError } = await supabase
    .from("latest_messages")
    .select("*")
    .in("chat_id", relatedChats);

  if (chatsError) throw new Error(chatsError.message);

  const chats = participantData
    .filter((data) => data.user_id != id)
    .map((chat) => {
      const lastChat = lastMessages.find(
        (message) => message.chat_id === chat.chat_id
      );
      return { ...chat, lastChat };
    });

  return chats;
}
