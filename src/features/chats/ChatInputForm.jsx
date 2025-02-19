import { HiPlus } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import supabase from "../../services/supabase";
import { toast } from "react-toastify";

/**
 * ChatInputForm component for sending messages.
 * @returns {JSX.Element} The ChatInputForm component.
 */
function ChatInputForm({ chatID, currentID, otherUserID, typingState }) {
  const [newMessage, setNewMessage] = useState("");
  const typingChannelRef = useRef(null);

  useEffect(() => {
    if (typeof typingState !== "function") return;

    const typingChannel = supabase.channel(`typing-${chatID}`, {
      config: {
        presence: {
          key: currentID,
        },
      },
    });
    typingChannelRef.current = typingChannel;

    typingChannel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") await typingChannel.track({ typing: false });
    });

    const handlePresenceChange = () => {
      const typingPresence = typingChannel.presenceState();
      const isOtherUserTyping =
        typingPresence[otherUserID]?.some((meta) => meta.typing) ?? false;
      console.log(otherUserID, isOtherUserTyping);
      typingState?.(isOtherUserTyping);
    };

    typingChannel.on("presence", { event: "sync" }, () => {
      handlePresenceChange();
    });

    typingChannel.on("presence", { event: "join" }, ({ key }) => {
      console.log(key);
      if (key === otherUserID) {
        handlePresenceChange();
      }
    });

    typingChannel.on("presence", { event: "leave" }, ({ key }) => {
      if (key === otherUserID) {
        handlePresenceChange();
      }
    });

    return () => {
      typingChannel.unsubscribe().then(() => {
        supabase.removeChannel(typingChannel);
      });
    };
  }, [chatID, currentID, otherUserID, typingState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage == "" || newMessage.trim() === "") return;

    const { error } = await supabase.from("messages").insert([
      {
        chat_id: chatID,
        created_at: new Date().toISOString(),
        sender_id: currentID,
        content: newMessage.trim(),
        type: "text",
        isReadby: false,
      },
    ]);

    if (error) {
      toast.error("Could not send message check your internet");
    } else {
      setNewMessage("");
    }
    if (typingChannelRef.current)
      await typingChannelRef.current.track({ typing: false });
  };

  async function handleTyping(e) {
    console.log(typingChannelRef);
    setNewMessage(e.target.value);

    if (typingChannelRef.current)
      await typingChannelRef.current.track({ typing: e.target.value !== "" });
  }

  return (
    <form
      className="w-full h-20 flex gap-2 items-center cursor-pointer"
      onSubmit={handleSubmit}
    >
      <div className="bg-gray-200 py-3 px-3 rounded-full dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light">
        <HiPlus size={20} className="fill-gray-500 dark:fill-accent-light" />
      </div>
      <input
        placeholder="Enter a Message"
        type="text"
        value={newMessage}
        onChange={handleTyping}
        className="basis-7/8 bg-gray-200  h-11 pl-6 focus:outline-none text-bg-dark dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light rounded-full"
      />
      <button type="submit" className="bg-primary-light py-3 px-3 rounded-full">
        <IoSend size={20} className="fill-white" />
      </button>
    </form>
  );
}

export default ChatInputForm;
