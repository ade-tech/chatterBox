import supabase from "./supabase";

export async function getAllChats(id) {
  const { data, error } = await supabase
    .from("chats")
    .select("id")
    .contains("chat_participants", [id]);

  if (error) {
    throw new Error("No Chats");
  }
  const chat_ids = data?.map((curData) => curData.id);
  const { data: participantData, error: fetchError } = await supabase
    .from("chats")
    .select("chat_participants , id")
    .in("id", chat_ids);

  if (fetchError) throw new Error("No Chats Available");

  const participantsIDs = participantData.map((cur) => {
    const ids = cur.chat_participants.flat();
    return { profileID: ids, chat_id: cur.id };
  });

  const participantsID = [
    ...new Set(participantsIDs.flatMap((participant) => participant.profileID)),
  ];
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .in("user_id", participantsID);

  const profileDataAndChatID = profileData.map((curProfile) => {
    const chatEntry = participantsIDs.find((part) =>
      part.profileID.includes(curProfile.user_id)
    );

    return {
      profile: curProfile,
      chat_id: chatEntry ? chatEntry.chat_id : null,
    };
  });

  if (profileError) throw new Error(profileError.message);

  const { data: lastMessages, error: chatsError } = await supabase
    .from("latest_messages")
    .select("*")
    .in("chat_id", chat_ids);

  if (chatsError) throw new Error(chatsError.message);

  const chats = profileDataAndChatID
    .filter((currentProfile) => currentProfile.profile.user_id !== id)
    .map((chat) => {
      const lastChat =
        lastMessages.find((message) => message.chat_id === chat.chat_id) || "";
      return { ...chat, lastChat };
    })
    .sort(
      (a, b) =>
        new Date(b.lastChat.created_at).getTime() -
        new Date(a.lastChat.created_at).getTime()
    );

  return chats;
}

export async function checkChat(current, id) {
  const { data, error } = await supabase
    .from("chats")
    .select("id")
    .contains("chat_participants", [current, id]);

  if (error) return [];

  return { data, error };
}

export async function createChat(current, id) {
  const { data, error } = await supabase.from("chats").insert([
    {
      chat_participants: [current, id],
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}
export async function getMessages(id) {
  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", {
      ascending: true,
    })
    .range(0, 9)
    .eq("chat_id", id);

  if (messagesError) throw new Error(messagesError.message);

  return messages;
}
