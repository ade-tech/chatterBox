import { UseOnlineUsers } from "../contexts/OnlineContext";

export function useMessageStatus(otherUser, isReadby) {
  const { onlineUsers } = UseOnlineUsers();

  const isDelivered = onlineUsers.includes(otherUser) && !isReadby;
  const isSeen =
    (!onlineUsers.includes(otherUser) && isReadby) ||
    (onlineUsers.includes(otherUser) && isReadby);
  const isSent = !onlineUsers.includes(otherUser) && !isReadby;

  return { isDelivered, isSeen, isSent };
}

export default useMessageStatus;
