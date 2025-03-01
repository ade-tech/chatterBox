import { useState } from "react";
import Close from "./close";
import supabase, { supabaseUrl } from "../services/supabase";
import { toast } from "react-toastify";
import useSize from "../utils/useSize";

const Preview = ({ onClose, preview, sender_id, chat_id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caption, setCaption] = useState("");

  const {
    imageSource,
    containerSize: { width, height },
  } = useSize({ preview });

  const fileExtension = preview.name.split(".").pop();
  const isADocument = ["pdf", "doc", "docx", "xls", "xlsx"].some(
    (doc) => doc === fileExtension
  );
  const isAVideo = preview.name.startsWith("video");

  function handleClose() {
    setCaption("");
    onClose();
  }

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      const imageName = `${crypto.randomUUID()}.${fileExtension}`.replaceAll(
        " ",
        ""
      );
      const imagePath = `${supabaseUrl}/storage/v1/object/public/chatFiles/${imageName}`;

      const { error: uploadError } = await supabase.storage
        .from("chatFiles")
        .upload(imageName, preview);

      if (uploadError) {
        console.error("Supabase storage upload error:", uploadError);
        toast.error(
          uploadError.message ||
            "File upload failed. Please check your network and file size."
        );
        return;
      }

      const { error: messageInsertError } = await supabase
        .from("messages")
        .insert([
          {
            chat_id,
            sender_id,
            created_at: new Date().toISOString(),
            content: imagePath,
            type: isADocument ? "document" : isAVideo ? "video" : "image",
            isReadby: false,
            caption: caption ? caption : null,
            filename: preview.name,
            filesize: preview.size,
          },
        ]);

      if (messageInsertError) {
        console.error("Supabase message insert error:", messageInsertError);
        toast.error(
          messageInsertError.message ||
            "Could not send message. Please check your internet connection."
        );
        return;
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Close onClose={handleClose} />
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{
          width: `${width ? `${width}px` : "100%"}`,
          height: `${height ? `${height}px` : "auto"}`,
          maxWidth: "80vw",
          maxHeight: "70vh",
        }}
      >
        {isADocument && (
          <div className="self-start flex gap-2 items-center ">
            <div className="w-16 h-18 items-center rounded-xl justify-center font-bold text-white flex bg-primary-light ">
              {" "}
              .{fileExtension}
            </div>
            <div className="pr-4 dark:text-white">
              <p>{preview.name}</p>
              <span>
                {preview.size > 1 * 1024 * 1024
                  ? `${Math.round(preview.size / (1024 * 1024))} MB`
                  : `${Math.round(preview.size / 1024)} KB`}
              </span>
            </div>
          </div>
        )}
        {preview?.type?.startsWith("image") ? (
          <img
            src={imageSource}
            className="max-w-full max-h-full object-contain rounded-2xl"
            alt="Preview"
          />
        ) : preview?.type?.startsWith("video") ? (
          <video
            src={imageSource}
            className="max-w-full max-h-full object-contain rounded-2xl"
            controls
          />
        ) : null}
      </div>
      <div className="w-full flex justify-center items-center mt-4">
        <input
          placeholder="Caption..."
          className="border-b border-gray-400 h-12 pl-3 dark:border-secondary-dark flex-1 mx-3 dark:placeholder:text-primary-dark outline-none dark:text-primary-dark"
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          className={`${
            isSubmitting ? "bg-accent-light" : "bg-primary-light"
          } cursor-pointer  h-12 px-5 py-2 rounded-lg text-white`}
          onClick={handleClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? "sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Preview;
