import { IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import supabase from "../../services/supabase";
import { toast } from "react-toastify";
import Menu from "../../ui/Menu";
import AddMedia from "../../ui/AddMedia";
import SpecialInputs from "./SpecialInputs";
import { FaFileImage, FaFilePdf, FaFileVideo } from "react-icons/fa";
import UploadModal from "./UploadModal";
import Preview from "../../ui/Preview";

/**
 * ChatInputForm component for sending messages.
 * @returns {JSX.Element} The ChatInputForm component.
 */
function ChatInputForm({ chatID, currentID, otherUserID, typingState }) {
  const [newMessage, setNewMessage] = useState("");

  const typingChannelRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
      typingState?.(isOtherUserTyping);
    };

    typingChannel.on("presence", { event: "sync" }, () => {
      handlePresenceChange();
    });

    typingChannel.on("presence", { event: "join" }, ({ key }) => {
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
    setNewMessage("");

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
      if (typingChannelRef.current)
        await typingChannelRef.current.track({ typing: false });
    }
  };

  async function handleTyping(e) {
    setNewMessage(e.target.value);

    if (typingChannelRef.current)
      await typingChannelRef.current.track({ typing: e.target.value !== "" });
  }

  return (
    <div className="w-full h-20 flex gap-2 items-center">
      <Menu>
        <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
          <Menu.Trigger>
            <AddMedia />
          </Menu.Trigger>

          <input
            placeholder="Enter a Message"
            type="text"
            value={newMessage}
            onChange={handleTyping}
            className="basis-11/12 bg-gray-200  h-11 pl-6 focus:outline-none text-bg-dark dark:bg-surface-dark dark:text-accent-light dark:placeholder:text-accent-light rounded-full "
          />
          <button
            type="submit"
            className="bg-primary-light py-3 px-3 rounded-full"
          >
            <IoSend size={20} className="fill-white" />
          </button>
        </form>

        <UploadModal>
          <Menu.Window>
            <UploadModal.Trigger>
              <SpecialInputs
                type="file"
                fileType="image/*"
                label="Image"
                fileAction={setSelectedFile}
                icon={
                  <FaFileImage
                    size={20}
                    className="mr-1 fill-current text-gray-600  dark:text-primary-dark"
                  />
                }
              />

              <SpecialInputs
                type="file"
                fileAction={setSelectedFile}
                fileType="video/mp4"
                label="Video"
                icon={
                  <FaFileVideo
                    size={20}
                    className="mr-1 fill-current text-gray-600  dark:text-primary-dark"
                  />
                }
              />

              <SpecialInputs
                type="file"
                fileAction={setSelectedFile}
                fileType=".pdf, .doc, .docx, .xls, .xlsx"
                label="Documents"
                icon={
                  <FaFilePdf
                    size={20}
                    className="mr-1 fill-current text-gray-600 dark:text-primary-dark"
                  />
                }
              />
            </UploadModal.Trigger>
          </Menu.Window>
          <UploadModal.Window>
            <Preview
              preview={selectedFile}
              chat_id={chatID}
              sender_id={currentID}
            />
          </UploadModal.Window>
        </UploadModal>
      </Menu>
    </div>
  );
}

export default ChatInputForm;
