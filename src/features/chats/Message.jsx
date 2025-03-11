import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import { UseOnlineUsers } from "../../contexts/OnlineContext";
import { getTimeSent } from "../../utils/gettime";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import useSize from "../../utils/useSize";
import { useEffect } from "react";
import supabase from "../../services/supabase";

/**
 * ReceiverChat component for displaying a chat message.
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message details.
 * @returns {JSX.Element} The ReceiverChat component.
 */
function ReceiverChat({ message, otherUser }) {
  const { user_id: currentUserID } = UseCurrentUserData();
  const { onlineUsers } = UseOnlineUsers();

  const {
    content,
    id,
    type,
    sender_id,
    isReadby,
    created_at,
    caption,
    filename,
    filesize,
  } = message;
  const {
    imageSource,
    containerSize: { width, height },
  } = useSize({ prevUrl: content, maxHeightScale: 0.55, maxWidthScale: 0.45 });

  const isDelivered = onlineUsers.includes(otherUser) && !isReadby;
  const isSeen =
    (!onlineUsers.includes(otherUser) && isReadby) ||
    (onlineUsers.includes(otherUser) && isReadby);
  const isSent = !onlineUsers.includes(otherUser) && !isReadby;
  const textSender = ` ${(isDelivered || isSent) && " text-white"} ${
    isSeen && "text-accent-dark"
  } text-xs fill-current`;

  const basicStyles = "max-w-72  md:max-w-96 w-fit py-2 px-5 rounded-3xl";
  if (sender_id === currentUserID && type === "text")
    return (
      <div className="mb-3 w-full">
        <div className={`${basicStyles} bg-primary-light ml-auto`}>
          <p className="text-sm text-white">{content}</p>
          <div className="flex">
            <p className="inline w-fit pr-1 text-left text-xs text-gray-300">
              {getTimeSent(created_at)}
            </p>
            {isDelivered || isSeen ? (
              <BiCheckDouble className={textSender} size={15} />
            ) : (
              <BiCheck className={textSender} size={15} />
            )}
          </div>
        </div>
      </div>
    );

  if (sender_id !== currentUserID && type === "text")
    return (
      <div className="mb-3 w-full">
        <div
          className={`${basicStyles} bg-primary-transparent dark:bg-bg-dark mr-auto border border-gray-200 dark:border-transparent`}
        >
          <p className="text-dark text-sm dark:text-white">{content}</p>
          <p className="w-full pr-3 text-right text-xs text-gray-500">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  if (sender_id === currentUserID && type === "image") {
    return (
      <div className="mb-3 w-full">
        <div
          style={{
            width: `${width ? `${width}px` : "auto"}`,
            height: `${height ? `${height}px` : "auto"}`,
          }}
          className={`${
            caption
              ? "bg-primary-light rounded-3xl px-5 py-2"
              : "bg-transparent"
          } ml-auto w-fit max-w-72 rounded-3xl md:max-w-96`}
        >
          <img src={imageSource} className="mt-2 mb-1 rounded-2xl" />
          {caption && <p className="text-sm text-white">{caption}</p>}
          <div className="flex">
            <p
              className={`${
                !caption && "text-gray-500 dark:text-gray-300"
              } inline w-fit pr-1 text-left text-xs text-gray-300`}
            >
              {getTimeSent(created_at)}
            </p>
            {isDelivered || isSeen ? (
              <BiCheckDouble className={`${textSender}`} size={15} />
            ) : (
              <BiCheck
                className={`${textSender} ${
                  !caption && "darK:fill-current fill-gray-600 dark:fill-white"
                }`}
                size={15}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  if (sender_id !== currentUserID && type === "image") {
    return (
      <div className="mb-3 w-full pb-2">
        <div
          style={{
            width: `${width ? `${width}px` : "auto"}`,
            height: `${height ? `${height}px` : "auto"}`,
          }}
          className={`${
            caption
              ? "dark:bg-bg-dark rounded-3xl border border-gray-200 px-5 py-2 dark:border-transparent"
              : "bg-transparent"
          }max-w-72 mr-auto w-fit rounded-3xl md:max-w-96`}
        >
          <img src={imageSource} className="mt-2 mb-2 rounded-2xl" />
          {caption && (
            <p className="text-sm text-black dark:text-white">{caption}</p>
          )}
          <p className="w-full pr-3 text-right text-xs text-gray-500">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  }
  if (sender_id === currentUserID && type === "video") {
    console.log(content);
    return (
      <div className="mb-3 w-full">
        <div
          className={`${
            caption ? "bg-primary-light" : "bg-transparent"
          } ${basicStyles} bg-primary-light ml-auto py-2`}
        >
          <video src={content} controls className="mt-2 mb-2 rounded-2xl" />
          {caption && <p className="text-sm text-white">{caption}</p>}
          <div className="flex">
            <p className="inline w-fit pr-1 text-left text-xs text-gray-300">
              {getTimeSent(created_at)}
            </p>
            {isDelivered || isSeen ? (
              <BiCheckDouble className={textSender} size={15} />
            ) : (
              <BiCheck className={textSender} size={15} />
            )}
          </div>
        </div>
      </div>
    );
  }
  if (sender_id !== currentUserID && type === "video") {
    return (
      <div className="mb-3 w-full">
        <div
          className={`${
            caption ? "border-1 border-gray-200" : "bg-transparent"
          } ${basicStyles} bg-primary-transparent mr-auto`}
        >
          <video src={content} controls className="mt-2 mb-2 rounded-2xl" />
          {caption && <p className="text-sm text-black">{caption}</p>}
          <p className="w-full pr-3 text-right text-xs text-gray-500">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  }
  if (type === "document") {
    return (
      <div className="mb-3 w-full">
        <div
          className={`${
            sender_id === currentUserID ? "ml-auto" : "mr-auto"
          } dark:bg-bg-dark flex max-w-64 items-center gap-2 self-start rounded-lg bg-gray-100 p-2 md:max-w-78`}
        >
          <div className="bg-primary-light flex h-18 w-20 items-center justify-center rounded-xl font-bold text-white">
            {" "}
            .{filename.split(".").pop()}
          </div>
          <div className="pr-4 dark:text-white">
            <p className="text-sm/3.5">{filename}</p>
            <div className="flex items-end justify-between">
              <span className="text-xs">
                {filesize > 1 * 1024 * 1024
                  ? `${Math.round(filesize / (1024 * 1024))} MB`
                  : `${Math.round(filesize / 1024)} KB`}
              </span>
              <div className="flex">
                <p className="inline w-fit pr-1 text-left text-xs text-gray-400">
                  {getTimeSent(created_at)}
                </p>
                {sender_id === currentUserID ? (
                  isDelivered || isSeen ? (
                    <BiCheckDouble
                      className={`${isSeen ? textSender : "text-gray-400"}`}
                      size={15}
                    />
                  ) : (
                    <BiCheck className={textSender} size={15} />
                  )
                ) : null}
              </div>
            </div>
          </div>
          <button
            className="mr-3 cursor-pointer"
            onClick={() => window.open(content, "_blank")}
          >
            <HiOutlineDocumentDownload
              size={35}
              className="dark:text-primary-dark stroke-current stroke-1"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default ReceiverChat;
