import { UseCurrentUserData } from "../../contexts/CurrentUserContext";
import { UseOnlineUsers } from "../../contexts/OnlineContext";
import { getTimeSent } from "../../utils/gettime";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import useSize from "../../utils/useSize";

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
      <div className="w-full mb-3">
        <div className={`${basicStyles} ml-auto bg-primary-light`}>
          <p className="text-white text-sm">{content}</p>
          <div className="flex">
            <p className="text-xs inline w-fit text-gray-300 text-left pr-1">
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
      <div className="w-full mb-3">
        <div
          className={`${basicStyles} mr-auto bg-primary-transparent border border-gray-200 dark:bg-bg-dark dark:border-transparent`}
        >
          <p className="text-dark text-sm dark:text-white">{content}</p>
          <p className="text-xs text-gray-500 text-right pr-3 w-full">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  if (sender_id === currentUserID && type === "image") {
    return (
      <div className="w-full mb-3">
        <div
          style={{
            width: `${width ? `${width}px` : "auto"}`,
            height: `${height ? `${height}px` : "auto"}`,
          }}
          className={`${
            caption
              ? " bg-primary-light py-2 px-5 rounded-3xl"
              : "bg-transparent"
          } max-w-72 md:max-w-96 w-fit rounded-3xl ml-auto`}
        >
          <img src={imageSource} className="mb-1 rounded-2xl mt-2" />
          {caption && <p className="text-sm text-white">{caption}</p>}
          <div className="flex">
            <p
              className={`${
                !caption && "text-gray-500 dark:text-gray-300"
              } text-xs inline w-fit text-gray-300 text-left pr-1`}
            >
              {getTimeSent(created_at)}
            </p>
            {isDelivered || isSeen ? (
              <BiCheckDouble className={`${textSender}`} size={15} />
            ) : (
              <BiCheck
                className={`${textSender} ${
                  !caption && " darK:fill-current dark:fill-white fill-gray-600"
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
      <div className="w-full mb-3 pb-2">
        <div
          style={{
            width: `${width ? `${width}px` : "auto"}`,
            height: `${height ? `${height}px` : "auto"}`,
          }}
          className={`${
            caption
              ? "border border-gray-200 dark:border-transparent dark:bg-bg-dark py-2 px-5 rounded-3xl"
              : "bg-transparent"
          }max-w-72  md:max-w-96 w-fit rounded-3xl mr-auto`}
        >
          <img src={imageSource} className="mb-2 rounded-2xl mt-2" />
          {caption && (
            <p className="text-sm text-black dark:text-white">{caption}</p>
          )}
          <p className="text-xs text-gray-500 text-right pr-3 w-full">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  }
  if (sender_id === currentUserID && type === "video") {
    console.log(content);
    return (
      <div className="w-full mb-3">
        <div
          className={`${
            caption ? "bg-primary-light" : "bg-transparent"
          } ${basicStyles} ml-auto py-2 bg-primary-light`}
        >
          <video src={content} controls className="mb-2 rounded-2xl mt-2" />
          {caption && <p className="text-sm text-white">{caption}</p>}
          <div className="flex">
            <p className="text-xs inline w-fit text-gray-300 text-left pr-1">
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
      <div className="w-full mb-3">
        <div
          className={`${
            caption ? "border-1 border-gray-200" : "bg-transparent"
          } ${basicStyles} mr-auto bg-primary-transparent`}
        >
          <video src={content} controls className="mb-2 rounded-2xl mt-2" />
          {caption && <p className="text-sm text-black">{caption}</p>}
          <p className="text-xs text-gray-500 text-right pr-3 w-full">
            {getTimeSent(created_at)}
          </p>
        </div>
      </div>
    );
  }
  if (type === "document") {
    return (
      <div className="w-full mb-3">
        <div
          className={`${
            sender_id === currentUserID ? "ml-auto" : "mr-auto"
          } self-start flex max-w-64 md:max-w-78  p-2 rounded-lg gap-2 items-center bg-gray-100 dark:bg-bg-dark`}
        >
          <div className="w-20 h-18 items-center rounded-xl justify-center font-bold text-white flex bg-primary-light">
            {" "}
            .{filename.split(".").pop()}
          </div>
          <div className="pr-4 dark:text-white">
            <p className="text-sm/3.5">{filename}</p>
            <div className="flex justify-between items-end">
              <span className="text-xs">
                {filesize > 1 * 1024 * 1024
                  ? `${Math.round(filesize / (1024 * 1024))} MB`
                  : `${Math.round(filesize / 1024)} KB`}
              </span>
              <div className="flex">
                <p className="text-xs inline w-fit text-gray-400 text-left pr-1">
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
            className="cursor-pointer mr-3"
            onClick={() => window.open(content, "_blank")}
          >
            <HiOutlineDocumentDownload
              size={35}
              className="stroke-current stroke-1  dark:text-primary-dark"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default ReceiverChat;
